import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse, BaseTokenError } from 'shared/types';
import { ActionCartProps, Cart } from '../types/cartTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

interface RemoveFromCartProps extends ActionCartProps {
  lineItemId: string;
}

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (props: RemoveFromCartProps, { rejectWithValue }) => {
    try {
      const { token, version, cartId, count, lineItemId } = props;

      const body = {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
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
  },
);
