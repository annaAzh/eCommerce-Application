import { Checkbox, DatePicker, Divider, Flex, Form, Input, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { formItemLayout, tailFormItemLayout } from './StyledRegistrationForm/StyledRegistrationForm';
import { PrimaryControlButton } from 'shared/ui';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAccessToken, passwordFlow, setUserId } from 'entities/User';
import { clearUserError } from 'entities/User/model/slices/userAccessTokenSlice';
import { setNotificationMessage } from 'entities/NotificationTool';
import { COUNTRIES } from 'shared/consts';
import {
  checkEmail,
  checkPassword,
  checkInput,
  checkStreet,
  checkBirthday,
  checkConfirmPassword,
  checkPostalCode,
} from 'shared/lib/checkValid';
import { UserCredentials, FormDataCredentials } from '../model/types/registrationTypes';
import { register } from '../model/services/requestRegistration';
import {
  getRegisterError,
  getRegistrationCustomerId,
  getUserRegistrationError,
} from '../model/selectors/registrationSelectors';
import { clearRegisterError } from '../model/slices/registrationSlice';
import './RegistrationForm.css';

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const customerId = useAppSelector(getRegistrationCustomerId);
  const registerError = useAppSelector(getRegisterError);
  const userError = useAppSelector(getUserRegistrationError);

  const [isDefaultBillingAddress, setIsDefaultBilling] = useState<boolean>(false);
  const [isDefaultShippingAddress, setIsDefaultShipping] = useState<boolean>(false);
  const [isSameAddress, setSameAddress] = useState<boolean>(false);

  useEffect(() => {
    if (customerId) {
      dispatch(setUserId(customerId));
      dispatch(
        setNotificationMessage({
          message: 'Registartion Successful',
          type: 'success',
          description: 'You have been registered successfully!',
        }),
      );
    }
  }, [customerId, dispatch]);

  useEffect(() => {
    if (!registerError) return;
    dispatch(
      setNotificationMessage({
        message: registerError.header,
        type: 'error',
        description: registerError.message,
      }),
    );
    dispatch(clearRegisterError());
  }, [registerError, dispatch]);

  useEffect(() => {
    if (!userError) return;
    dispatch(
      setNotificationMessage({
        message: userError,
        type: 'error',
      }),
    );
    dispatch(clearUserError());
  }, [userError, dispatch]);

  const handleForm = (formData: FormDataCredentials) => {
    const billingCountry = isSameAddress ? formData.country : formData.billingCountry;
    const billingPostalCode = isSameAddress ? formData.postalCode : formData.billingPostalCode;
    const billingCity = isSameAddress ? formData.city : formData.billingCity;
    const billingStreet = isSameAddress ? formData.streetName : formData.billingStreet;

    const SHIPPING_INDEX = 0;
    const BILLING_INDEX = 1;

    const userCredentialData: UserCredentials = {
      token: accessToken,
      isSameAddress,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      dateOfBirth: dayjs(formData.dateOfBirth).format('YYYY-MM-DD'),
      addresses: [
        {
          streetName: formData.streetName,
          postalCode: formData.postalCode,
          city: formData.city,
          country: formData.country,
        },
        {
          streetName: billingStreet,
          postalCode: billingPostalCode,
          city: billingCity,
          country: billingCountry,
        },
      ],
      shippingAddresses: [SHIPPING_INDEX],
      billingAddresses: [BILLING_INDEX],

      ...(isDefaultShippingAddress && { defaultShippingAddress: SHIPPING_INDEX }),
      ...((isDefaultBillingAddress || (isDefaultShippingAddress && isSameAddress)) && {
        defaultBillingAddress: BILLING_INDEX,
      }),
    };

    if (accessToken) {
      dispatch(register(userCredentialData));
      dispatch(passwordFlow({ username: userCredentialData.email, password: userCredentialData.password }));
    } else {
      dispatch(
        setNotificationMessage({
          message: 'connection problems',
          type: 'error',
          description: 'missing access',
        }),
      );
    }
  };

  return (
    <>
      <div className="form-content">
        <h2 className="formRegistration-title">New Customer</h2>
        <Form {...formItemLayout} form={form} name="register" onFinish={handleForm} scrollToFirstError>
          <Form.Item name="email" label="E-mail" required rules={checkEmail()}>
            <Input placeholder="example@email.com" />
          </Form.Item>
          <Form.Item name="password" label="Password" required rules={checkPassword()}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            required
            dependencies={['password']}
            rules={checkConfirmPassword()}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="firstName" label="First name" required rules={checkInput('First name')}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last name" required rules={checkInput('Last name')}>
            <Input />
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Date of Birth" required rules={checkBirthday()}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          {isSameAddress ? (
            <Divider orientation="center">Shipping and billing address</Divider>
          ) : (
            <Divider orientation="center">Shipping address</Divider>
          )}

          <Form.Item name="streetName" label="Street" required rules={checkStreet()}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" required rules={checkInput('City')}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please select Country!' }]}>
            <Select placeholder="Select your country">
              {COUNTRIES.map(({ title, value }) => (
                <Option key={title} value={value}>
                  {title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="postalCode"
            label="Postal code"
            required
            dependencies={['country']}
            rules={checkPostalCode('country')}
          >
            <Input />
          </Form.Item>

          <div className="checkbox-inner">
            <Checkbox onChange={() => setIsDefaultShipping(!isDefaultShippingAddress)} className="checkox-default">
              Set as a default address
            </Checkbox>
            <Checkbox onChange={() => setSameAddress(!isSameAddress)} className="checkox-same">
              Set the same shipping and billing address
            </Checkbox>
          </div>

          {!isSameAddress && (
            <>
              <Divider orientation="center">Billing address</Divider>

              <Form.Item name="billingStreet" label="Street" required rules={checkStreet()}>
                <Input />
              </Form.Item>
              <Form.Item name="billingCity" label="City" required rules={checkInput('city')}>
                <Input />
              </Form.Item>
              <Form.Item
                name="billingCountry"
                label="Country"
                rules={[{ required: true, message: 'Please select Country!' }]}
              >
                <Select placeholder="Select your country">
                  {COUNTRIES.map(({ title, value }) => (
                    <Option key={title} value={value}>
                      {title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="billingPostalCode"
                label="Postal code"
                dependencies={['billingCountry']}
                required
                rules={checkPostalCode('billingCountry')}
              >
                <Input />
              </Form.Item>

              <div className="checkbox-inner">
                <Checkbox onChange={() => setIsDefaultBilling(!isDefaultBillingAddress)} className="checkox-default">
                  Set as a default address
                </Checkbox>
              </div>
            </>
          )}

          <Form.Item {...tailFormItemLayout}>
            <Flex align="center" gap="small" style={{ marginTop: '20px' }}>
              <PrimaryControlButton type="primary" htmlType="submit" className="login-form-button">
                Register
              </PrimaryControlButton>
              or <Link to="/login">Log in now!</Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export { RegistrationForm };
