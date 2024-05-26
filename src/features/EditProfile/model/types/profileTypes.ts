interface ProfileSchema {
  user: ProfileProperties;
  isLoading: boolean;
  error?: string;
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

export { ProfileSchema, ProfileData, ErrorWithResponse, Address };
