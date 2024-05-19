import { NotificationToolSchema } from 'entities/NotificationTool';

const randomNumberMock = 0.5;
jest.spyOn(global.Math, 'random').mockImplementation(() => randomNumberMock);

const initialNotificationState: NotificationToolSchema = {
  message: 'test',
  type: 'info',
  description: 'another test',
  placement: 'bottomRight',
  messageId: Math.random(),
};

const payload: NotificationToolSchema = {
  message: 'new value',
  type: 'error',
  description: 'new description value',
  placement: 'top',
};

export { initialNotificationState, payload };
