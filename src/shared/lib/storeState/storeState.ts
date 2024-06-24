type StoreKeys = 'token' | 'anonymous';

const setLocalStoreState = (value: string, key: StoreKeys = 'token'): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStoreState = (key: StoreKeys = 'token'): string => {
  let response = localStorage.getItem(key) || '';
  if (response) {
    response = JSON.parse(response);
  }
  return response;
};

const deleteLocalStoreStateByKey = (key: StoreKeys): void => {
  localStorage.removeItem(key);
};

const clearLocalStoreState = (): void => {
  localStorage.clear();
};

export { setLocalStoreState, getLocalStoreState, clearLocalStoreState, deleteLocalStoreStateByKey };
