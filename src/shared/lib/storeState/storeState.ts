const STORE_KEY = 'token';

// interface TokenOauth {
//   access_token: string;
//   expires_in: number;
//   refresh_token: string;
// }

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

const isAccessTokenExpired = (expiresAt: number) => {
  return Date.now() > expiresAt;
};

export { setLocalStoreState, getLocalStoreState, clearLocalStoreState, isAccessTokenExpired };
