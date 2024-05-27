import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CatalogProps, GetProductResponse, ProductResponse } from '../types/catalogTypes';
import { BaseTokenError, ErrorWithResponse, Images, Product } from 'shared/types';
import { setPrices } from 'shared/lib/changeData';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const convertDataIntoAppropriateFormat = (products: GetProductResponse): Product[] => {
  const result: Product[] = [];

  products.results.forEach((product: ProductResponse) => {
    const pricePath = product.masterVariant.prices[0];

    const images: string[] = product.masterVariant.images.map((image: Images) => image.url);

    const newProductEntry: Product = {
      id: product.id,
      key: product.key,
      name: product.name['en-US'] || '',
      description: product.description['en-US'] || '',
      images,
      prices: setPrices(pricePath),
    };
    result.push(newProductEntry);
  });

  return result;
};

export const getAllProducts = createAsyncThunk('catalog/getAllProducts', async (data: CatalogProps, thunkAPI) => {
  try {
    const { token, filter, sort } = data;
    const res = await axios.get(`${API_URL}${PROJECT_KEY}/product-projections/search`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      params: {
        filter,
        sort,
      },
    });
    const success: GetProductResponse = res.data;
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
