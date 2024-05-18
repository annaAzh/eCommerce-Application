import { Button } from 'antd';
import { setNotificationMessage } from 'entities/NotificationTool';
import { setUserIsLoginedStatus } from 'entities/User';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { clearLocalStoreState } from 'shared/lib/storeState/storeState';
import { Paths } from 'shared/types';
import './LogoutButton.css';

export const ButtonLogOut = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLogin = false;

  const LogoutUser = () => {
    dispatch(setUserIsLoginedStatus(isLogin));
    dispatch(
      setNotificationMessage({
        message: "You're logged out",
      }),
    );
    clearLocalStoreState();
  };

  return (
    <Link to={Paths.login}>
      <Button type="primary" htmlType="button" className="logOut-header-button" onClick={LogoutUser}>
        LogOut
      </Button>
    </Link>
  );
};
