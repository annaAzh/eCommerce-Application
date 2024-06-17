import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionCartProps } from 'entities/Cart';
import { Cart } from 'entities/Cart/model/types/cartTypes';
import { BaseTokenError, ErrorWithResponse } from 'shared/types/errorResponseTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

export interface RemovePromoCodeProps extends ActionCartProps {
  idCode: string;
}

export const removePromoCode = createAsyncThunk(
  'cart/removeDiscountCode',
  async (props: RemovePromoCodeProps, { rejectWithValue }) => {
    const { token, version, cartId, idCode } = props;
    try {
      const body = {
        version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: idCode,
            },
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
