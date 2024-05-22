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

interface PasswordFlowSuccess {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
}

interface PasswordFlownReject extends AccessTokenReject {
  error_description: string;
}

type LoginData = {
  username: string;
  password: string;
};

export {
  ErrorWithResponse,
  AccessTokenReject,
  AccessTokenSuccess,
  PasswordFlowSuccess,
  PasswordFlownReject,
  LoginData,
};
