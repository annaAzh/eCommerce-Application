import { FC, useEffect, useState } from 'react';
import { Form, Input, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkEmail, checkPassword } from 'shared/lib/checkValid';
import { PrimaryControlButton } from 'shared/ui';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import './LoginForm.css';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { Link } from 'react-router-dom';
import { setUserId } from 'entities/User';
import { requestLogin } from '../model/services/requestLogin';
import { setNotificationMessage } from 'entities/NotificationTool';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.userAccessToken.user);
  const { customerId } = useAppSelector((state) => state.login);
  const { error, responeId } = useAppSelector((state) => state.login);
  const [prevResponeId, setprevResponeId] = useState(responeId);

  useEffect(() => {
    if (customerId) {
      dispatch(setUserId(customerId));
    }
  }, [customerId, dispatch]);

  useEffect(() => {
    if (error && responeId !== prevResponeId) {
      dispatch(
        setNotificationMessage({
          message: error.header,
          type: 'error',
          description: error.message,
        }),
      );
      setprevResponeId(responeId);
    }
  }, [responeId]);

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (accessToken) {
      dispatch(requestLogin({ username: email, password, token: accessToken }));
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
    <div className="form-content">
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item style={{ height: '60px' }} name="email" rules={checkEmail()}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item style={{ height: '60px' }} name="password" rules={checkPassword()}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex align="center" gap="small">
            <PrimaryControlButton type="primary" htmlType="submit" className="login-form-button">
              Log in
            </PrimaryControlButton>
            or <Link to="/registration">register now!</Link>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export { LoginForm };
