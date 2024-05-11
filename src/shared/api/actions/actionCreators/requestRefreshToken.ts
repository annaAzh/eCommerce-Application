import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RefreshTokenSucces, ErrorWithResponse, RefreshTokenReject } from 'shared/api/actions/types/tokenTypes';
import { PROJECT_KEY, BASE_URL, CLIENT_ID, CLIENT_SECRET } from 'shared/consts/Commercetools';

type LoginData = {
  username: string;
  password: string;
};
export const requestRefreshToken = createAsyncThunk(
  'token/requestLoginToken',
  async (loginData: LoginData, thunkAPI) => {
    try {
      const { username, password } = loginData;
      const res = await axios.post<RefreshTokenSucces>(`oauth/${PROJECT_KEY}/customers/token`, null, {
        baseURL: `${BASE_URL}`,
        params: { grant_type: `password`, username, password },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
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
