import { NotificationToolSchema } from 'entities/NotificationTool';
import { notificationReducer, setNotificationMessage } from './NotificationToolSlice';

const randomNumberMock = 0.5;
jest.spyOn(global.Math, 'random').mockImplementation(() => randomNumberMock);

const initialState: NotificationToolSchema = {
  message: 'test',
  type: 'info',
  description: 'another test',
  placement: 'bottomRight',
  messageId: Math.random(),
};

const expectedState: NotificationToolSchema = {
  message: 'new value',
  type: 'error',
  description: 'new description value',
  placement: 'top',
};

describe('Testing NotificationTool slice', () => {
  it('should return default state', () => {
    const state = notificationReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('should return a value equal to the payload', () => {
    const state = notificationReducer(initialState, {
      type: setNotificationMessage.type,
      payload: expectedState,
    });
    expect(state).not.toEqual(initialState);
    expect(state).toEqual({ ...expectedState, messageId: randomNumberMock });
  });
});
