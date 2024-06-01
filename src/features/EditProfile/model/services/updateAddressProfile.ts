import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegistrationReject } from 'features/RegistrationUser/model/types/registrationTypes';
import { ErrorWithResponse, ProfileData, UpdateAddressParams } from '../types/profileTypes';

const API_URL = process.env.API_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;

export const updateUserAddress = createAsyncThunk(
  'profile/updateAddress',
  async (params: UpdateAddressParams, thunkAPI) => {
    try {
      const { token, version, id } = params;

      const body = {
        id,
        version,
      };

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      const res = await axios.post(`${API_URL}${PROJECT_KEY}/customers/${id}`, body, { headers });
      const success: ProfileData = res.data;
      return success;
    } catch (error) {
      let defaultMessage = 'Something went wrong';

      if (error instanceof Error) {
        const reject: ErrorWithResponse = error as ErrorWithResponse;
        if (reject.response && reject.response.data) {
          const errorResponse: RegistrationReject = reject.response.data as unknown as RegistrationReject;

          if (errorResponse.statusCode === 401) {
            errorResponse.message = 'Having problems accessing the server';
          } else if (errorResponse.statusCode === 400) {
            errorResponse.message = 'Bad Request: The password don"t match';
          } else if (errorResponse.statusCode === 403) {
            errorResponse.message = 'Forbidden: You do not have permission to access this resource.';
          }

          defaultMessage = errorResponse.message || defaultMessage;
        }
      }

      return thunkAPI.rejectWithValue(defaultMessage);
    }
  },
);
