import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FormattedCategories, GetCategoriesResponse } from '../types/productTypes';
import { BaseTokenError, ErrorWithResponse } from 'shared/types';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

export const convertCategoriesIntoAppropriateFormat = (data: GetCategoriesResponse) => {
  const result: FormattedCategories[] = [];
  data.results.forEach((category) => {
    const { name, id } = category;

    if (!category.parent) {
      result.push({ name: name['en-US'], id, subCategory: [] });
    } else {
      result.forEach((line) => {
        if (category.parent?.id === line.id) {
          if (!line.subCategory) line.subCategory = [];
          line.subCategory.push({ name: name['en-US'], id });
        }
      });
    }
  });
  return result;
};

export const getAvailableCategories = createAsyncThunk(
  'product/getAvailableCategories',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}${PROJECT_KEY}/categories`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      const success: GetCategoriesResponse = res.data;
      return convertCategoriesIntoAppropriateFormat(success);
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
