import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse } from 'entities/User';
import { PasswordFlowSuccess, PasswordFlownReject } from '../types/tokenTypes';

const AUTH_URL = process.env.AUTH_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
type LoginData = {
  username: string;
  password: string;
};
export const passwordFlow = createAsyncThunk('user/passwordFlow', async (loginData: LoginData, thunkAPI) => {
  try {
    const { username, password } = loginData;
    const res = await axios.post<PasswordFlowSuccess>(`oauth/${PROJECT_KEY}/customers/token`, null, {
      baseURL: AUTH_URL,
      params: { grant_type: `password`, username, password },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });
    const success: PasswordFlowSuccess = res.data;
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
