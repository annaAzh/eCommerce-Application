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
const rootState = state as RootState;

test('testing notification selector getAllNotificationProps', () => {
  expect(getAllNotificationProps(rootState)).toBeDefined();
  expect(getAllNotificationProps(rootState)).toEqual(state.notification);
});
