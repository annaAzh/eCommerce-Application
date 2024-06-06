import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseTokenError, ErrorWithResponse } from 'shared/types/errorResponseTypes';
import { Cart } from '../model/types/cartTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

export const getExistCart = createAsyncThunk('cart/getExistCart', async (token: string, { rejectWithValue }) => {
  try {
    const res = await axios.get<Cart>(`${API_URL}${PROJECT_KEY}/me/active-cart`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });

    const { id, version } = res.data;

    return { id, version };
  } catch (error) {
    let errorMsg = 'error';
    const reject: ErrorWithResponse = error as ErrorWithResponse;
    if (reject.response && reject.response.data) {
      const errorResponse: BaseTokenError = reject.response.data as BaseTokenError;
      errorMsg = errorResponse.message;
    }
    return rejectWithValue(errorMsg);
  }
});
