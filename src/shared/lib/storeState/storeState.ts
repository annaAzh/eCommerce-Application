const STORE_KEY = 'token';

const setLocalStoreState = (token: string): void => {
  localStorage.setItem(STORE_KEY, JSON.stringify(token));
};

const getLocalStoreState = (): string => {
  let response = localStorage.getItem(STORE_KEY) || '';
  if (response) {
    response = JSON.parse(response);
  }
  return response;
};

const clearLocalStoreState = (): void => {
  localStorage.clear();
};

export { setLocalStoreState, getLocalStoreState, clearLocalStoreState };
