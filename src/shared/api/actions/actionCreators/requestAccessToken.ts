import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AccessTokenReject, AccessTokenSuccess, ErrorWithResponse } from 'shared/api/actions/types/tokenTypes';
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from 'shared/consts/Commercetools';

export const requestAccessToken = createAsyncThunk('token/requestAccessToken', async (_, thunkAPI) => {
  try {
    const res = await axios.post<AccessTokenSuccess>('oauth/token', null, {
      baseURL: `${BASE_URL}`,
      params: { grant_type: `client_credentials` },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });
    const success: AccessTokenSuccess = res.data;
    return success;
  } catch (error) {
    let errorMsg = 'damn error';
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
