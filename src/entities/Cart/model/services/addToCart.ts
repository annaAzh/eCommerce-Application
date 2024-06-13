import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseTokenError, ErrorWithResponse } from 'shared/types/errorResponseTypes';
import { ActionCartProps, Cart } from '../types/cartTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

interface AddToCartProps extends ActionCartProps {
  productId: string;
}

export const addToCart = createAsyncThunk('cart/addToCart', async (props: AddToCartProps, { rejectWithValue }) => {
  const { token, version, productId, cartId, count } = props;
  try {
    const body = {
      version,
      actions: [
        {
          action: 'addLineItem',
          productId,
          quantity: count || 1,
        },
      ],
    };

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    const res = await axios.post<Cart>(`${API_URL}${PROJECT_KEY}/carts/${cartId}`, body, { headers });

    const success: Cart = {
      id: res.data.id,
      version: res.data.version,
      lineItems: res.data.lineItems,
      totalPrice: res.data.totalPrice,
      discountCodes: res.data.discountCodes,
    };

    return success;
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
