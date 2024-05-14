import { DatePicker, Divider, Flex, Form, Input, Select } from 'antd';
import Link from 'antd/es/typography/Link';
import { FC } from 'react';
import { formItemLayout, tailFormItemLayout } from './StyledRegistrationForm/StyledRegistrationForm';
import { PrimaryControlButton } from 'shared/ui';
import {
  checkEmail,
  checkPassword,
  checkInput,
  checkStreet,
  checkBirthday,
  checkConfirmPassword,
  checkPostalCode,
} from 'shared/lib/checkValid';
import { COUNTRIES } from 'shared/consts';
import './RegistrationForm.css';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import dayjs from 'dayjs';
import { FormDataCredentials } from '../model/types/registrationTypes';
import { register } from '../model/services/requestRegistration';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import icon from 'shared/assets/img/check.png';

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const registrationSuccess = useAppSelector((state) => state.auth.customerId);
  const { accessToken } = useAppSelector((state) => state.userAccessToken.user);

  const handleForm = (formData: FormDataCredentials) => {
    const userCredentialData = {
      token: accessToken,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      dateOfBirth: dayjs(formData.dateOfBirth).format('YYYY-MM-DD'),
      shippingCountry: formData.country,
      shippingPostalCode: formData.postalCode,
      shippingCity: formData.city,
      shippingStreet: formData.streetName,
    };

    dispatch(register(userCredentialData));
  };

  return (
    <>
      {registrationSuccess ? (
        <div className="form-notification">
          <img className="form-icon" src={icon} alt="check icon" />
          <h2 className="form-title">You have been successfully registered</h2>
        </div>
      ) : (
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
            <Divider orientation="center">Address</Divider>
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
              rules={checkPostalCode()}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Flex align="center" gap="small">
                <PrimaryControlButton type="primary" htmlType="submit" className="login-form-button">
                  Register
                </PrimaryControlButton>
                or <Link>Log in now!</Link>
              </Flex>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};
export { RegistrationForm };
