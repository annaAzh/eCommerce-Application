import { RootState } from 'app/providers/storeProvider';

export const getAllNotificationProps = (state: RootState) => {
  return state.notification;
};
