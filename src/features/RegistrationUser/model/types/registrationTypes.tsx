import { AccessTokenReject } from 'entities/User';

interface RegisterSchema {
  customerId?: string;
  isLoading: boolean;
  error?: ErrorRegistretionDataResponse;
}

interface UserCredentials {
  token?: string;
  isSameAddress: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  shippingAddresses: number[];
  billingAddresses: number[];
}

interface Address {
  id?: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface UserData {
  username: string;
  password: string;
}

interface FormDataCredentials extends UserCredentials {
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
  billingCountry: string;
  billingPostalCode: string;
  billingCity: string;
  billingStreet: string;
}

interface RefreshTokenSucces {
  customer: {
    addresses: Address[];
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

type ErrorRegistretionDataResponse = {
  header: string;
  message: string;
};

interface RegistrationReject extends Omit<AccessTokenReject, 'error'> {}

export {
  UserCredentials,
  FormDataCredentials,
  RegisterSchema,
  RefreshTokenSucces,
  RegistrationReject,
  ErrorRegistretionDataResponse,
  UserData,
};
