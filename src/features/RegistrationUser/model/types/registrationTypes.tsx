interface RegisterSchema {
  customerId?: string;
  isLoading: boolean;
  error?: string;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
      statusCode: number;
      errors: [
        {
          code: number;
          message: string;
        },
      ];
    };
  };
}

interface UserCredentials {
  token?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  shippingCountry?: string;
  shippingPostalCode?: string;
  shippingCity?: string;
  shippingStreet?: string;
  billingCountry?: string;
  billingPostalCode?: string;
  billingCity?: string;
  billingStreet?: string;
  defaultBillingAddress?: boolean;
  defaultShippingAddress?: boolean;
}

interface FormDataCredentials extends UserCredentials {
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
}

export { ErrorResponse, UserCredentials, FormDataCredentials, RegisterSchema };
