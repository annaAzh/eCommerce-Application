import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkEmail, checkPassword } from '../model/LoginUser-model';
import styled from 'styled-components';
import './LoginUser.css';

const FormItem = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;
const StyledButton = styled(Button)`
  width: 6rem;
  background: green;
  &:hover {
    background: grey !important;
  }
`;

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
        <FormItem>
          <StyledButton type="primary" htmlType="submit" className="login-form-button">
            Log in
          </StyledButton>
          or <a href="">register now!</a>
        </FormItem>
      </Form>
    </div>
  );
};

export { LoginUser };
