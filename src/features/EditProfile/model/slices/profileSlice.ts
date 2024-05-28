import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '../../../../features/EditProfile/model/services/getUserProfile';
import { ProfileData, ProfileSchema } from '../types/profileTypes';

const initialState: ProfileSchema = {
  user: {},
  isLoading: false,
  error: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError(state: ProfileSchema) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        state.user.firstName = payload.firstName;
        state.user.lastName = payload.lastName;
        state.user.email = payload.email;
        state.user.dateOfBirth = payload.dateOfBirth;
        state.user.defaultShippingAddressId = payload.defaultShippingAddressId;
        state.user.defaultBillingAddressId = payload.defaultBillingAddressId;
        state.user.billingAddressIds = payload.billingAddressIds;
        state.user.shippingAddressIds = payload.shippingAddressIds;
        state.user.addresses = payload.addresses;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: profileReducer } = profileSlice;

export const { clearProfileError } = profileSlice.actions;
