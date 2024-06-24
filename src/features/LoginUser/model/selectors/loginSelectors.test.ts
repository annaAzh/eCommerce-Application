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
    responseId: Math.random(),
  },
};

const rootState = state as RootState;

describe('testing Login selectors', () => {
  it('test getLoginResponseId', () => {
    expect(getLoginResponseId(rootState)).toEqual(randomNumberMock);
  });
  it('test getLoginCustomerId', () => {
    expect(getLoginCustomerId(rootState)).toBeUndefined();
  });
  it('test getLoginError', () => {
    expect(getLoginError(rootState)).toBeDefined();
    expect(getLoginError(rootState)).toEqual(testError);
  });
});
