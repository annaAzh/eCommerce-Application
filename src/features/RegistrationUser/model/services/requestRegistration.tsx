import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorResponse, UserCredentials } from '../types/registrationTypes';
import { RefreshTokenSucces } from '../types/registrationTypes';

const API_URL = process.env.API_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;

export const register = createAsyncThunk('auth/register', async (params: UserCredentials, thunkAPI) => {
  try {
    const token = params.token;

    const body = {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      password: params.password,
      dateOfBirth: params.dateOfBirth,
      addresses: [
        {
          streetName: params.shippingStreet,
          postalCode: params.shippingPostalCode,
          city: params.shippingCity,
          country: params.shippingCountry,
        },
      ],
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
    console.log(error);
    const err = error as ErrorResponse;
    const errorMsg = 'An error occurred during registration';
    if (err.response.data.statusCode === 400) {
      const message = err.response.data.message;
      console.log(message ?? errorMsg);
    }

    if (err.response.data.errors) {
      const message = err.response.data.errors[0].message;
      console.log(message ?? errorMsg);
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});
