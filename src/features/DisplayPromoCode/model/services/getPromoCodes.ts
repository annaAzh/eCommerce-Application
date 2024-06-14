import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorWithResponse } from 'shared/types';
import { PromoCode, PromoCodeReject, PromoCodeResponse } from '../types/promoCodesTypes';
import axios from 'axios';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const changeFormatOfIncomingData = (data: PromoCodeResponse): PromoCode[] => {
  const result: PromoCode[] = [];

  data.results.forEach((item: PromoCode) => {
    const promoCode: PromoCode = {
      code: item.code,
      description: item.description,
      isApply: false,
    };
    result.push(promoCode);
  });
  return result;
};

export const getPromoCodes = createAsyncThunk('cart/queryDiscountCodes', async (token: string, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}${PROJECT_KEY}/discount-codes`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const success: PromoCodeResponse = res.data;
    return changeFormatOfIncomingData(success);
  } catch (error) {
    let errorMsg = 'error';
    const reject: ErrorWithResponse = error as ErrorWithResponse;
    if (reject.response && reject.response.data) {
      const errorResponse: PromoCodeReject = reject.response.data as PromoCodeReject;
      errorMsg = errorResponse.message;
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});
