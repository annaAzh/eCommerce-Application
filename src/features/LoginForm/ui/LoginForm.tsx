import { FC } from 'react';
import { Form, Input, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkEmail, checkPassword } from '../../../shared/lib/checkValid';
import StyledLoginFormButton from './StyledLoginFormButton/StyledLoginFormButton';
import './LoginForm.css';

const LoginUser: FC = () => {
  return (
    <div className="form-content">
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
        <Form.Item name="email" rules={checkEmail()}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={checkPassword()}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex align="center" gap="small">
            <StyledLoginFormButton type="primary" htmlType="submit" className="login-form-button">
              Log in
            </StyledLoginFormButton>
            or <a href="">register now!</a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export { LoginUser };
