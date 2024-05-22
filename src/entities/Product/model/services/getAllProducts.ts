import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FormattedPrice, GetProductResponse, Images, Prices, Product, ProductResponse } from '../types/productTypes';
import { BaseTokenError, ErrorWithResponse } from 'shared/types';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const setPrices = (prices: Prices): FormattedPrice => {
  const result: FormattedPrice = {
    currentPrice: '0$',
  };

  if (prices.value) {
    const { currencyCode, centAmount, fractionDigits } = prices.value;
    const currentCurrency = currencyCode === 'USD' ? '$' : '';
    const currentPrice = `${(centAmount / 100).toFixed(fractionDigits)}${currentCurrency}`;
    result.currentPrice = currentPrice;
  }

  if (prices.discounted) {
    const { currencyCode, centAmount, fractionDigits } = prices.discounted.value;
    const discountedCurrency = currencyCode === 'USD' ? '$' : '';
    const discountedPrice = `${(centAmount / 100).toFixed(fractionDigits)}${discountedCurrency}`;
    result.discountedPrice = discountedPrice;
  }

  return result;
};

const convertDataIntoAppropriateFormat = (products: GetProductResponse): Product[] => {
  const result: Product[] = [];

  products.results.forEach((product: ProductResponse) => {
    const basePath = product.masterData.staged;
    const basePricePath = basePath.masterVariant.prices[0];

    const images: string[] = basePath.masterVariant.images.map((image: Images) => image.url);

    const newProductEntry: Product = {
      id: product.id,
      name: basePath.name['en-US'] || '',
      description: basePath.description['en-US'] || '',
      images,
      prices: setPrices(basePricePath),
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
