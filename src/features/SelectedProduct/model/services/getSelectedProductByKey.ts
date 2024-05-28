import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse, Images, Product } from 'shared/types';
import { ProductReject, ProductSelectedResponse } from '../types/selectedProductTypes';
import { setPrices } from 'shared/lib/dataConverters';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const convertDataProductIntoAppropriateFormat = (product: ProductSelectedResponse): Product => {
  const assetsProduct = product.masterData.staged;
  const pricePath = assetsProduct.masterVariant.prices[0];
  const images: string[] = assetsProduct.masterVariant.images.map((image: Images) => image.url);
  const newProductEntry: Product = {
    id: product.id,
    key: product.key,
    name: assetsProduct.name['en-US'] || '',
    description: assetsProduct.description['en-US'] || '',
    images,
    prices: setPrices(pricePath),
  };

  return newProductEntry;
};

type DataType = { token: string; productKey: string };

export const getProductByKey = createAsyncThunk('card/getProductByKey', async (data: DataType, thunkAPI) => {
  try {
    const { token, productKey } = data;
    const res = await axios.get(`${API_URL}${PROJECT_KEY}/products/key=${productKey}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const success: ProductSelectedResponse = res.data;
    return convertDataProductIntoAppropriateFormat(success);
  } catch (error) {
    let statusCode = 404;
    const reject: ErrorWithResponse = error as ErrorWithResponse;
    if (reject.response && reject.response.data) {
      const errorResponse: ProductReject = reject.response.data as ProductReject;
      statusCode = errorResponse.statusCode;
    }
    return thunkAPI.rejectWithValue(statusCode);
  }
});
