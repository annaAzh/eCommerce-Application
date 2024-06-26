import { Checkbox, DatePicker, Divider, Flex, Form, Input, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { formItemLayout, tailFormItemLayout } from './StyledRegistrationForm/StyledRegistrationForm';
import { PrimaryControlButton } from 'shared/ui';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  clearUserError,
  getAccessToken,
  getUserError,
  getUserIsLoginedStatus,
  passwordFlow,
  setUserId,
} from 'entities/User';
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
import { UserCredentials, FormDataCredentials, UserData } from '../model/types/registrationTypes';
import { register } from '../model/services/requestRegistration';
import { getRegisterError, getRegistrationCustomerId } from '../model/selectors/registrationSelectors';
import { clearRegisterError } from '../model/slices/registrationSlice';
import styles from './RegistrationForm.module.css';
import './RegistrationForm.css';
import { Paths } from 'shared/types';

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const customerId = useAppSelector(getRegistrationCustomerId);
  const registerError = useAppSelector(getRegisterError);
  const userError = useAppSelector(getUserError);

  const [isUserData, setUserData] = useState<UserData>();
  const [isDefaultBillingAddress, setIsDefaultBilling] = useState<boolean>(false);
  const [isDefaultShippingAddress, setIsDefaultShipping] = useState<boolean>(false);
  const [isSameAddress, setSameAddress] = useState<boolean>(false);

  const isLogined = useAppSelector(getUserIsLoginedStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogined) navigate(Paths.start);
  }, [isLogined]);

  useEffect(() => {
    if (!customerId || !isUserData || isLogined) return;
    dispatch(setUserId(customerId));
    dispatch(passwordFlow(isUserData));
    dispatch(
      setNotificationMessage({
        message: 'Registration Successful',
        description: 'You have been registered successfully!',
      }),
    );
  }, [customerId]);

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
  }, [registerError]);

  useEffect(() => {
    if (!userError) return;
    dispatch(
      setNotificationMessage({
        message: userError,
        type: 'error',
      }),
    );
    dispatch(clearUserError());
  }, [userError]);

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

    if (accessToken && !isLogined) {
      dispatch(register(userCredentialData));
      setUserData({ username: userCredentialData.email, password: userCredentialData.password });
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
      <div className={styles.container}>
        <div className={styles.formContent}>
          <h2 className={styles.formRegistrationTitle}>Sign up</h2>
          <Form {...formItemLayout} form={form} name="register" onFinish={handleForm} scrollToFirstError>
            <Form.Item name="email" label="E-mail" required rules={checkEmail()}>
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" required rules={checkPassword()}>
              <Input.Password autoComplete="on" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              required
              dependencies={['password']}
              rules={checkConfirmPassword('password')}
            >
              <Input.Password autoComplete="on" />
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
              <Divider orientation="left">Shipping and billing address</Divider>
            ) : (
              <Divider orientation="left">Shipping address</Divider>
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

            <div className={styles.checkboxInner}>
              <Checkbox
                onChange={() => setIsDefaultShipping(!isDefaultShippingAddress)}
                className={styles.checkoxDefault}
              >
                Set as a default address
              </Checkbox>
              <Checkbox onChange={() => setSameAddress(!isSameAddress)} className={styles.checkoxSame}>
                Set the same shipping and billing address
              </Checkbox>
            </div>

            {!isSameAddress && (
              <>
                <Divider orientation="left">Billing address</Divider>

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

                <div className={styles.checkboxInner}>
                  <Checkbox
                    onChange={() => setIsDefaultBilling(!isDefaultBillingAddress)}
                    className={styles.checkoxDefault}
                  >
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
                or
                <Link to="/login" className={styles.registerLink}>
                  Log in now!
                </Link>
              </Flex>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export { RegistrationForm };
