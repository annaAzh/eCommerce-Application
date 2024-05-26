const STORE_KEY = 'token';

interface TokenOauth {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

const setLocalStoreState = (token: TokenOauth): void => {
  localStorage.setItem(STORE_KEY, JSON.stringify(token));
};

const getLocalStoreState = (): TokenOauth => {
  const response = localStorage.getItem(STORE_KEY);
  if (response) {
    return JSON.parse(response) as TokenOauth;
  } else {
    return { access_token: '', expires_in: 0, refresh_token: '' };
  }
};

const clearLocalStoreState = (): void => {
  localStorage.clear();
};

const isAccessTokenExpired = (expiresAt: number) => {
  return Date.now() > expiresAt;
};

export { setLocalStoreState, getLocalStoreState, clearLocalStoreState, isAccessTokenExpired };
