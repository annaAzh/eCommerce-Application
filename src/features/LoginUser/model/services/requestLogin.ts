import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorDataResponse, LoginReject, RefreshTokenSucces } from '../types/loginTypes';
import { ErrorWithResponse } from 'entities/User';

type LoginData = {
  username: string;
  password: string;
  token: string;
};
export const requestLogin = createAsyncThunk('login/requestLoginToken', async (loginData: LoginData, thunkAPI) => {
  try {
    const { username, password, token } = loginData;

    const data = { email: username, password: password };
    const res = await axios.post<RefreshTokenSucces>(`${process.env.PROJECT_KEY}/login`, data, {
      baseURL: `${process.env.API_URL}`,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const success: RefreshTokenSucces = res.data;
    return success;
  } catch (error) {
    let errorPayload: ErrorDataResponse = {
      header: 'error',
      message: 'something went wrong',
    };

    if (error instanceof Error) {
      const reject: ErrorWithResponse = error as ErrorWithResponse;
      if (reject.response && reject.response.data) {
        const errorResponse: LoginReject = reject.response.data as unknown as LoginReject;
        if (errorResponse.statusCode === 401) {
          errorPayload = {
            header: errorResponse.message,
            message: 'having problems accessing the server',
          };
        } else if (errorResponse.statusCode === 400) {
          errorPayload = {
            header: errorResponse.message,
            message: 'login or password is incorrect',
          };
        }
      }
    }
    return thunkAPI.rejectWithValue(errorPayload);
  }
});
