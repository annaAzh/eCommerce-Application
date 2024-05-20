import { getAllNotificationProps } from './NotificationTool';
import { RootState } from 'app/providers/storeProvider';

const state: DeepPartial<RootState> = {
  notification: {
    message: 'test',
    type: 'info',
    description: 'another test',
    placement: 'bottomRight',
    messageId: Math.random(),
  },
};

test('testing notification selector getAllNotificationProps', () => {
  expect(getAllNotificationProps(state as RootState)).toBeDefined();
  expect(getAllNotificationProps(state as RootState)).toEqual(state.notification);
});
