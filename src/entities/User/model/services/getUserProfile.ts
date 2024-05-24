import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserData } from '../types/userTypes';
import {
  ErrorRegistretionDataResponse,
  RegistrationReject,
} from 'features/RegistrationUser/model/types/registrationTypes';
import { ErrorWithResponse } from '../types/tokenTypes';

const API_URL = process.env.API_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;

export const getUserProfile = createAsyncThunk('profile/getData', async (params: string, thunkAPI) => {
  try {
    const token = params;

    const res = await axios.get(`${API_URL}${PROJECT_KEY}/me`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });

    const success: UserData = res.data;

    return success;
  } catch (error) {
    const errorPayload: ErrorRegistretionDataResponse = {
      header: 'error',
      message: 'Something went wrong',
    };

    if (error instanceof Error) {
      const reject: ErrorWithResponse = error as ErrorWithResponse;
      if (reject.response && reject.response.data) {
        const errorResponse: RegistrationReject = reject.response.data as unknown as RegistrationReject;
        console.log(errorResponse);
      }
    }
    return thunkAPI.rejectWithValue(errorPayload);
  }
});
