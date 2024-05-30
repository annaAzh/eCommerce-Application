interface ProfileSchema {
  user: ProfileProperties;
  isLoading: boolean;
  error?: string;
  updated?: boolean;
}

interface Address {
  id?: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface ProfileData {
  id?: string;
  version?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  billingAddressIds?: string[];
  shippingAddressIds?: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}

interface ProfileProperties extends ProfileData {
  accessToken?: string;
  userId?: string;
  isLogined?: boolean;
}

interface ErrorWithResponse extends Error {
  response?: {
    data: unknown;
  };
}

interface FormDataProfile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

interface UpdateDetailsParams extends FormDataProfile {
  id?: string;
  token?: string;
  version?: number;
}

export { ProfileSchema, ProfileData, ErrorWithResponse, Address, UpdateDetailsParams, FormDataProfile };
