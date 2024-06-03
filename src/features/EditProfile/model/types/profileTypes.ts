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

interface FormDataPassword {
  currentPassword: string;
  newPassword: string;
}

interface UpdatePasswordParams extends FormDataPassword {
  id?: string;
  token?: string;
  version?: number;
}

interface FormDataAddress {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  billingAddressIds?: boolean;
  shippingAddressIds?: boolean;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  addressId?: string;
  id?: string;
}

interface UpdateAddressParams extends FormDataAddress {
  idUser?: string;
  token?: string;
  version?: number;
}
interface UpdateAddressParams extends Address {}

interface RemoveAddressParams {
  idUser?: string;
  token?: string;
  version?: number;
  addressId?: string;
}

interface AddNewAddressParams extends FormDataAddress {
  idUser?: string;
  token?: string;
  version?: number;
}
interface AddNewAddressParams extends Address {}

export {
  ProfileSchema,
  ProfileData,
  ErrorWithResponse,
  Address,
  UpdateDetailsParams,
  FormDataProfile,
  UpdatePasswordParams,
  FormDataPassword,
  UpdateAddressParams,
  FormDataAddress,
  RemoveAddressParams,
  AddNewAddressParams,
};
