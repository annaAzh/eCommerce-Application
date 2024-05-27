import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CatalogProps, GetProductResponse, Images, Prices, ProductResponse } from '../types/catalogTypes';
import { BaseTokenError, ErrorWithResponse, FormattedPrice, Product } from 'shared/types';
import { CARD_ON_PAGE } from 'shared/consts';

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
    const pricePath = product.masterVariant.prices[0];

    const images: string[] = product.masterVariant.images.map((image: Images) => image.url);

    const newProductEntry: Product = {
      id: product.id,
      name: product.name['en-US'] || '',
      description: product.description['en-US'] || '',
      images,
      prices: setPrices(pricePath),
    };
    result.push(newProductEntry);
  });

  return result;
};

export const getAllProducts = createAsyncThunk(
  'catalog/getAllProducts',
  async (data: CatalogProps, { rejectWithValue }) => {
    try {
      const { token, sort, variantFilter } = data;
      const res = await axios.get(`${API_URL}${PROJECT_KEY}/product-projections/search`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        params: {
          filter: variantFilter,
          sort,
          limit: CARD_ON_PAGE,
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
      return rejectWithValue(errorMsg);
    }
  },
);
