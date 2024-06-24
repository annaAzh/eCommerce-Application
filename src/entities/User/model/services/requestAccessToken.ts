import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse, AccessTokenReject, AccessTokenSuccess } from '../types/tokenTypes';
import { setLocalStoreState } from '../../../../shared/lib/storeState/storeState';

const AUTH_URL = process.env.AUTH_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

export const requestAccessToken = createAsyncThunk('user/requestAccessToken', async (_, thunkAPI) => {
  try {
    const res = await axios.post<AccessTokenSuccess>(`oauth/${PROJECT_KEY}/anonymous/token`, null, {
      baseURL: AUTH_URL,
      params: { grant_type: `client_credentials` },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });
    const success: AccessTokenSuccess = res.data;
    setLocalStoreState(success.refresh_token, 'anonymous');
    return success;
  } catch (error) {
    let errorMsg = 'error';
    if (error instanceof Error) {
      const reject: ErrorWithResponse = error as ErrorWithResponse;
      if (reject.response && reject.response.data) {
        const errorResponse: AccessTokenReject = reject.response.data as AccessTokenReject;
        errorMsg = errorResponse.message;
      }
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});
