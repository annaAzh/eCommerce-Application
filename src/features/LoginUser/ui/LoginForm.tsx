import { FC, useEffect, useState } from 'react';
import { Form, Input, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { checkEmail, checkPassword } from 'shared/lib/checkValid';
import { PrimaryControlButton } from 'shared/ui';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import styles from './LoginForm.module.css';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { Link, useNavigate } from 'react-router-dom';
import {
  passwordFlow,
  getAccessToken,
  setUserId,
  getUserError,
  clearUserError,
  getUserIsLoginedStatus,
} from 'entities/User';
import { requestLogin } from '../model/services/requestLogin';
import { setNotificationMessage } from 'entities/NotificationTool';
import { getLoginCustomerId, getLoginError, getLoginResponseId } from '../model/selectors/loginSelectors';
import { clearLoginError } from '../model/slices/loginSlice';
import { Paths } from 'shared/types';

type LoginData = { email: string; password: string };

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useAppSelector(getAccessToken);
  const loginCustomerId = useAppSelector(getLoginCustomerId);
  const loginError = useAppSelector(getLoginError);
  const loginResponseId = useAppSelector(getLoginResponseId);
  const userError = useAppSelector(getUserError);
  const isLogined = useAppSelector(getUserIsLoginedStatus);
  const [loginData, setLoginData] = useState<LoginData>();

  useEffect(() => {
    if (isLogined) navigate(Paths.start);
  }, [isLogined]);

  useEffect(() => {
    if (!loginCustomerId || !loginData) return;
    const { email, password } = loginData;
    dispatch(setUserId(loginCustomerId));
    dispatch(passwordFlow({ username: email, password }));
    dispatch(
      setNotificationMessage({
        message: 'Successful  login',
      }),
    );
  }, [loginResponseId]);

  useEffect(() => {
    if (!loginError) return;
    dispatch(
      setNotificationMessage({
        message: loginError.header,
        type: 'error',
        description: loginError.message,
      }),
    );
    dispatch(clearLoginError());
  }, [loginError]);

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

  const onFinish = (values: LoginData) => {
    const { email, password } = values;
    if (accessToken) {
      dispatch(requestLogin({ username: email, password, token: accessToken }));
      setLoginData({ email, password });
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
    <div className={styles.formContent}>
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
