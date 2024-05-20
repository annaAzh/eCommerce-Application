import { getLoginCustomerId, getLoginError, getLoginResponseId } from './loginSelectors';
import { RootState } from 'app/providers/storeProvider';

const randomNumberMock = 0.5;
jest.spyOn(global.Math, 'random').mockImplementation(() => randomNumberMock);

const testError = { header: 'test', message: 'another test' };
const state: DeepPartial<RootState> = {
  login: {
    customerId: undefined,
    isLoading: false,
    error: testError,
    responeId: Math.random(),
  },
};

describe('testing Login selectors', () => {
  it('test getLoginResponseId', () => {
    expect(getLoginResponseId(state as RootState)).toEqual(randomNumberMock);
  });
  it('test getLoginCustomerId', () => {
    expect(getLoginCustomerId(state as RootState)).toBeUndefined();
  });
  it('test getLoginError', () => {
    expect(getLoginError(state as RootState)).toBeDefined();
    expect(getLoginError(state as RootState)).toEqual(testError);
  });
});
