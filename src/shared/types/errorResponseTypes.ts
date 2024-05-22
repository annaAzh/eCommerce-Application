interface ErrorWithResponse extends Error {
  response?: {
    data: unknown;
  };
}

interface BaseTokenError {
  error: string;
  errors: TokenRejectErrors[];
  message: string;
  statusCode: number;
}

type TokenRejectErrors = { code: string; message: string };

export { ErrorWithResponse, BaseTokenError };
