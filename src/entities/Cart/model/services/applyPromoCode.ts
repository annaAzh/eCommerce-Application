import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionCartProps } from 'entities/Cart';
import { Cart } from 'entities/Cart/model/types/cartTypes';
import { BaseTokenError, ErrorWithResponse } from 'shared/types/errorResponseTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

interface PromoCodeProps extends ActionCartProps {
  code: string;
}

export const applyPromoCode = createAsyncThunk(
  'cart/addDiscountCode',
  async (props: PromoCodeProps, { rejectWithValue }) => {
    const { token, version, cartId, code } = props;
    try {
      const body = {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      };

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      const res = await axios.post<Cart>(`${API_URL}${PROJECT_KEY}/carts/${cartId}`, body, { headers });

      console.log(res.data);

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
