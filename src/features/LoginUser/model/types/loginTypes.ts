import { AccessTokenReject } from 'entities/User';

interface LoginSchema {
  customerId?: string;
  isLoading: boolean;
  error?: string;
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

interface LoginReject extends Omit<AccessTokenReject, 'error'> {}

export { LoginSchema, RefreshTokenSucces, LoginReject };
