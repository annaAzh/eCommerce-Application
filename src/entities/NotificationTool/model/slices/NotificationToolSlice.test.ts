import { initialNotificationState, payload } from '../../../../app/__mocks__/notification/notificationMock';
import { notificationReducer, setNotificationMessage } from './NotificationToolSlice';

const randomNumberMock = 0.5;

describe('Testing NotificationTool slice', () => {
  it('should return default state', () => {
    const state = notificationReducer(initialNotificationState, { type: '' });
    expect(state).toEqual(initialNotificationState);
  });
  it('should return a value equal to the payload', () => {
    const state = notificationReducer(initialNotificationState, {
      type: setNotificationMessage.type,
      payload: payload,
    });
    expect(state).not.toEqual(initialNotificationState);
    expect(state).toEqual({ ...payload, messageId: randomNumberMock });
  });
});
