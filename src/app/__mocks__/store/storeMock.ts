import { RootState } from 'app/providers/storeProvider';
import { initialNotificationState } from '../notification/notificationMock';
import { initialLoginState } from '../login/loginMock';
import { initialUserState } from '../user/userMock';
import { initialRegisterationState } from '../auth/authMock';

const mockStore: RootState = {
  userAccessToken: initialUserState,
  login: initialLoginState,
  auth: initialRegisterationState,
  notification: initialNotificationState,
};

export { mockStore };
