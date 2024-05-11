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

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <div className="form-content">
      <h2 className="formRegistration-title">New Customer</h2>
      <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
        <Form.Item name="email" label="E-mail" required={true} rules={checkEmail()}>
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item name="password" label="Password" required={true} rules={checkPassword()}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} rules={checkConfirmPassword()}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="firstname" label="First name" rules={checkInput('first name')}>
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last name" rules={checkInput('last name')}>
          <Input />
        </Form.Item>
        <Form.Item name="dateOfBirth" label="Date of Birth" rules={checkBirthday()}>
          <DatePicker />
        </Form.Item>
        <Divider orientation="center">Address</Divider>
        <Form.Item name="street" label="Street" rules={checkStreet()}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City" rules={checkInput('city')}>
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
        <Form.Item name="postal" label="Postal code" dependencies={['country']} rules={checkPostalCode()}>
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
  );
};
export { RegistrationForm };
