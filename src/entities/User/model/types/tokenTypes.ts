interface ErrorWithResponse extends Error {
  response?: {
    data: unknown;
  };
}
interface AccessTokenReject {
  error: string;
  errors: TokenRejectErrors[];
  message: string;
  statusCode: number;
}

type TokenRejectErrors = { code: string; message: string };

interface AccessTokenSuccess {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export { ErrorWithResponse, AccessTokenReject, AccessTokenSuccess };
