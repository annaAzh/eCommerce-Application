import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetProdactResponse, Images, Product, ProductResponse } from '../types/productTypes';
import { BaseTokenError, ErrorWithResponse } from 'shared/types';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const convertDataIntoAppropriateFormat = (prodacts: GetProdactResponse): Product[] => {
  const result: Product[] = [];

  prodacts.results.forEach((prodact: ProductResponse) => {
    const basePath = prodact.masterData.staged;

    const images: string[] = basePath.masterVariant.images.map((image: Images) => image.url);

    const newProductEntry: Product = {
      id: prodact.id,
      name: basePath.name['en-US'] || '',
      description: basePath.description['en-US'] || '',
      images,
    };

    result.push(newProductEntry);
  });

  return result;
};

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (token: string, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}${PROJECT_KEY}/products`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const success: GetProdactResponse = res.data;
    return convertDataIntoAppropriateFormat(success);
  } catch (error) {
    let errorMsg = 'error';
    const reject: ErrorWithResponse = error as ErrorWithResponse;
    if (reject.response && reject.response.data) {
      const errorResponse: BaseTokenError = reject.response.data as BaseTokenError;
      errorMsg = errorResponse.message;
    }
    return thunkAPI.rejectWithValue(errorMsg);
  }
});