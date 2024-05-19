import { getAllNotificationProps } from './NotificationTool';
import { initialNotificationState } from '../../../../app/__mocks__/notification/notificationMock';
import { mockStore } from '../../../../app/__mocks__/store/storeMock';

test('test getLoginResponseId', () => {
  expect(getAllNotificationProps(mockStore)).toEqual(initialNotificationState);
});
