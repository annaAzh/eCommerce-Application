import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginReject, RefreshTokenSucces } from '../types/loginTypes';
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
    let errorMsg = 'error';
    if (error instanceof Error) {
      const reject: ErrorWithResponse = error as ErrorWithResponse;
      if (reject.response && reject.response.data) {
        const errorResponse: LoginReject = reject.response.data as unknown as LoginReject;
        errorMsg = errorResponse.message;
      }
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

// export const requestRefreshToken = createAsyncThunk(
//   'token/requestLoginToken',
//   async (loginData: LoginData, thunkAPI) => {
//     try {
//       const { username, password, token } = loginData;

//       const data = { email: username, password: password };
//       const res = await axios.post<RefreshTokenSucces>(`${process.env.PROJECT_KEY}/login`, data, {
//         baseURL: `${process.env.API_URL}`,
//         // headers: { Authorization: `Bearer 1mM1MZX-GiCV3ORrl5JPM4eAM2zZO4iZ`, 'Content-Type': 'application/json' },
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       const success: RefreshTokenSucces = res.data;
//       return success;
//     } catch (error) {
//       let errorMsg = 'damn error';
//       if (error instanceof Error) {
//         const reject: ErrorWithResponse = error as ErrorWithResponse;
//         if (reject.response && reject.response.data) {
//           const errorResponse: RefreshTokenReject = reject.response.data as RefreshTokenReject;
//           errorMsg = errorResponse.message;
//         }
//       }
//       return thunkAPI.rejectWithValue(errorMsg);
//     }
//   },
// );
