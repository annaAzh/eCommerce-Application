import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegistrationReject, UserCredentials } from '../types/registrationTypes';
import { RefreshTokenSucces } from '../types/registrationTypes';
import { ErrorWithResponse } from 'entities/User';

const API_URL = process.env.API_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;

export const register = createAsyncThunk('auth/register', async (params: UserCredentials, thunkAPI) => {
  try {
    const token = params.token;

    const body: Omit<UserCredentials, 'token'> = {
      ...params,
    };

    const headersRegisterUser = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const customerResponse = await axios.post<RefreshTokenSucces>(`${API_URL}${PROJECT_KEY}/customers`, body, {
      headers: headersRegisterUser,
    });
    const success: RefreshTokenSucces = customerResponse.data;
    return success;
  } catch (error) {
    let errorMsg = 'An error occurred during registration';
    if (error instanceof Error) {
      const reject: ErrorWithResponse = error as ErrorWithResponse;
      if (reject.response && reject.response.data) {
        const errorResponse: RegistrationReject = reject.response.data as unknown as RegistrationReject;
        errorMsg = errorResponse.message;
      }
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});
