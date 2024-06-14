import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse, BaseTokenError } from 'shared/types';
import { Cart } from '../types/cartTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

interface RemoveFromCartProps {
  token: string;
  version: number;
  cartId: string;
  lineItemId: string[];
}

export const clearRemoteCart = createAsyncThunk(
  'cart/clearRemoteCart',
  async (props: RemoveFromCartProps, { rejectWithValue }) => {
    try {
      const { token, version, lineItemId, cartId } = props;

      const actions = lineItemId.map((item) => {
        return {
          action: 'removeLineItem',
          lineItemId: item,
        };
      });

      const body = {
        version,
        actions,
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
  },
);
