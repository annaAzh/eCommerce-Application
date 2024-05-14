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

interface RefreshTokenSucces {
  customer: {
    addresses: string[];
    authenticationMode: string;
    billingAddressIds: string[];
    createdAt: string;
    createdBy: {
      isPlatformClient: boolean;
      user: {
        id: string;
        typeId: string;
      };
    };
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: boolean;
    lastMessageSequenceNumber: number;
    lastModifiedAt: string;
    lastModifiedBy: {
      isPlatformClient: boolean;
    };
    user: {
      id: string;
      typeId: string;
    };
    lastName: string;
    middleName: string;
    password: string;
    salutation: string;
    shippingAddressIds: string[];
    stores: string[];
    title: string;
    version: number;
    versionModifiedAt: string;
  };
}

export { ErrorResponse, UserCredentials, FormDataCredentials, RegisterSchema, RefreshTokenSucces };
