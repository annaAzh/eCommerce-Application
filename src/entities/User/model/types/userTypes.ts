interface UserSchema {
  user: UserProperties;
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

interface UserData {
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

interface UserProperties extends UserData {
  accessToken?: string;
  userId?: string;
  isLogined: boolean;
}

export { UserSchema, Address, UserData };
