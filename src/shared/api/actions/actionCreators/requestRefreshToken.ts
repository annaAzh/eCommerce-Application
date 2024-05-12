import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RefreshTokenSucces, ErrorWithResponse, RefreshTokenReject } from 'shared/api/actions/types/tokenTypes';

type LoginData = {
  username: string;
  password: string;
};
export const requestRefreshToken = createAsyncThunk(
  'token/requestLoginToken',
  async (loginData: LoginData, thunkAPI) => {
    try {
      const { username, password } = loginData;
      const res = await axios.post<RefreshTokenSucces>(`oauth/${process.env.PROJECT_KEY}/customers/token`, null, {
        baseURL: `${process.env.AUTH_URL}`,
        params: { grant_type: `password`, username, password },
        auth: {
          username: process.env.CLIENT_ID || '',
          password: process.env.CLIENT_SECRET || '',
        },
      });
      const success: RefreshTokenSucces = res.data;
      return success;
    } catch (error) {
      let errorMsg = 'damn error';
      if (error instanceof Error) {
        const reject: ErrorWithResponse = error as ErrorWithResponse;
        if (reject.response && reject.response.data) {
          const errorResponse: RefreshTokenReject = reject.response.data as RefreshTokenReject;
          errorMsg = errorResponse.message;
        }
      }
      return thunkAPI.rejectWithValue(errorMsg);
    }
  },
);
