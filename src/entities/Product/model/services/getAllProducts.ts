import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CatalogProps, GetProductResponse, ProductResponse } from '../types/productTypes';
import { BaseTokenError, ErrorWithResponse, Images, Product } from 'shared/types';
import { removeHtmlTags, setPrices } from '../../../../shared/lib/dataConverters';
import { CARD_ON_PAGE } from '../../../../shared/consts';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

export const convertDataIntoAppropriateFormat = (
  response: GetProductResponse,
): { result: Product[]; total: number } => {
  const { results, total } = response;
  const result: Product[] = [];

  results.forEach((product: ProductResponse) => {
    const pricePath = product.masterVariant.prices[0];

    const images: string[] = product.masterVariant.images.map((image: Images) => image.url);

    const newProductEntry: Product = {
      id: product.id,
      key: product.key,
      name: product.name['en-US'] || '',
      description: removeHtmlTags(product.description['en-US'] || ''),
      images,
      prices: setPrices(pricePath),
    };
    result.push(newProductEntry);
  });

  return { result, total };
};

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (data: CatalogProps, { rejectWithValue }) => {
    try {
      const { token, sort, filter, fuzzy, search, page } = data;

      const res = await axios.get(`${API_URL}${PROJECT_KEY}/product-projections/search`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        params: {
          filter,
          sort,
          fuzzy,
          'text.en-US': search || undefined,
          limit: CARD_ON_PAGE,
          offset: page ? (page - 1) * CARD_ON_PAGE : 0,
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
