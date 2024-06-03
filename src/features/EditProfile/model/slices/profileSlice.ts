import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '../../../../features/EditProfile/model/services/getUserProfile';
import { ProfileData, ProfileSchema } from '../types/profileTypes';
import { updateUserDetails } from '../services/updateDetailsProfile';
import { updateUserPassword } from '../services/updatePasswordProfile';
import { updateUserAddress } from '../services/updateAddressProfile';
import { addNewUserAddress } from '../services/addNewAddressProfile';
import { removeUserAddress } from '../services/deleteAddressProfile';

const initialState: ProfileSchema = {
  user: {},
  isLoading: false,
  error: undefined,
  updated: false,
};

const handleUserProfileFulfilled = (state: ProfileSchema, payload: ProfileData) => {
  state.user.id = payload.id;
  state.user.version = payload.version;
  state.user.firstName = payload.firstName;
  state.user.lastName = payload.lastName;
  state.user.email = payload.email;
  state.user.dateOfBirth = payload.dateOfBirth;
  state.user.defaultShippingAddressId = payload.defaultShippingAddressId;
  state.user.defaultBillingAddressId = payload.defaultBillingAddressId;
  state.user.billingAddressIds = payload.billingAddressIds;
  state.user.shippingAddressIds = payload.shippingAddressIds;
  state.user.addresses = payload.addresses;
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError(state: ProfileSchema) {
      state.error = undefined;
    },
    clearProfileUpdated(state: ProfileSchema) {
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        handleUserProfileFulfilled(state, payload);
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(updateUserDetails.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        handleUserProfileFulfilled(state, payload);
        state.updated = true;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetails.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        handleUserProfileFulfilled(state, payload);
        state.updated = true;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(updateUserAddress.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        handleUserProfileFulfilled(state, payload);
        state.updated = true;
      })
      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAddress.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(addNewUserAddress.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        handleUserProfileFulfilled(state, payload);
        state.updated = true;
      })
      .addCase(addNewUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewUserAddress.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(removeUserAddress.fulfilled, (state, { payload }: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.error = undefined;
        handleUserProfileFulfilled(state, payload);
        state.updated = true;
      })
      .addCase(removeUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUserAddress.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: profileReducer } = profileSlice;

export const { clearProfileError, clearProfileUpdated } = profileSlice.actions;
