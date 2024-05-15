import { AccessTokenReject } from 'entities/User';

interface RegisterSchema {
  customerId?: string;
  isLoading: boolean;
  error?: string;
}

interface UserCredentials {
  token?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses?: Address[];
  defaultBillingAddress?: boolean;
  defaultShippingAddress?: boolean;
}

interface Address {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
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

interface RegistrationReject extends Omit<AccessTokenReject, 'error'> {}

export { UserCredentials, FormDataCredentials, RegisterSchema, RefreshTokenSucces, RegistrationReject };
