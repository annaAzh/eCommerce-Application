import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse } from 'entities/User';
import { PasswordFlowSuccess, PasswordFlownReject } from '../types/tokenTypes';

const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

export const refreshFlow = createAsyncThunk('user/refreshTokenFlow', async (token: string, thunkAPI) => {
  try {
    const response = await axios.post(`oauth/token`, null, {
      baseURL: AUTH_URL,
      params: { grant_type: `refresh_token`, refresh_token: token },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const success: PasswordFlowSuccess = response.data;
    return success;
  } catch (error) {
    let errorMsg = 'error';
    if (error instanceof Error) {
      const reject: ErrorWithResponse = error as ErrorWithResponse;
      if (reject.response && reject.response.data) {
        const errorResponse: PasswordFlownReject = reject.response.data as PasswordFlownReject;
        errorMsg = errorResponse.message;
      }
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});
