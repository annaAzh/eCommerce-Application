import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseTokenError, ErrorWithResponse } from 'shared/types/errorResponseTypes';
import { Cart } from '../types/cartTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

export const createCart = createAsyncThunk('cart/createCart', async (token: string, { rejectWithValue }) => {
  try {
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    const res = await axios.post<Cart>(`${API_URL}${PROJECT_KEY}/me/carts`, { currency: 'USD' }, { headers });

    const { id, version, lineItems, totalPrice, discountCodes } = res.data;

    return { id, version, lineItems, totalPrice, discountCodes };
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
