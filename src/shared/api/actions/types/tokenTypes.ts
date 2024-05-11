interface AccessTokenSuccess {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface RefreshTokenSucces extends AccessTokenSuccess {
  refresh_token: string;
}

interface AccessTokenReject {
  error: string;
  errors: TokenRejectErrors[];
  message: string;
  statusCode: number;
}
type TokenRejectErrors = { code: string; message: string };

interface RefreshTokenReject extends AccessTokenReject {
  error_description: string;
}

interface ErrorWithResponse extends Error {
  response?: {
    data: unknown;
  };
}
interface Token {
  token: string;
  isLoading: boolean;
  error: string;
}

export { ErrorWithResponse, AccessTokenReject, RefreshTokenSucces, AccessTokenSuccess, RefreshTokenReject, Token };
