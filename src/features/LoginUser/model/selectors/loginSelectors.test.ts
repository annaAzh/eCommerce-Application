import { getLoginCustomerId, getLoginError, getLoginResponseId } from './loginSelectors';
import { initialLoginState } from '../../../../app/__mocks__/login/loginMock';
import { mockStore } from '../../../../app/__mocks__/store/storeMock';

describe('testing Login selectors', () => {
  it('test getLoginResponseId', () => {
    expect(getLoginResponseId(mockStore)).toEqual(initialLoginState.responeId);
  });
  it('test getLoginCustomerId', () => {
    expect(getLoginCustomerId(mockStore)).toEqual(initialLoginState.customerId);
  });
  it('test getLoginError', () => {
    expect(getLoginError(mockStore)).toBeDefined();
    expect(getLoginError(mockStore)).toEqual(initialLoginState.error);
  });
});
