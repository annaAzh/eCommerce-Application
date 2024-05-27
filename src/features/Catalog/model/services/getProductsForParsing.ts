import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorWithResponse } from 'entities/User';
import { BaseTokenError } from 'shared/types';
import { CatalogProps, GetProductResponse, ParseResponse } from '../types/catalogTypes';
import { ITEMS_FOR_PARSING } from 'shared/consts';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const convertParseData = (data: GetProductResponse) => {
  const availableAttributes = new Map<string, Set<string>>();
  let maxPrice = 0;
  let minPrice = Number.MAX_VALUE;

  data.results.forEach((item) => {
    const attributesPath = item.masterVariant.attributes;

    if (attributesPath) {
      attributesPath.forEach((attribute) => {
        const { name, value } = attribute;
        if (availableAttributes.has(name)) {
          availableAttributes.get(name)?.add(value);
        } else {
          availableAttributes.set(name, new Set<string>().add(value));
        }
      });
    }

    item.masterVariant.prices.forEach((price) => {
      if (price.discounted) {
        const priceValue = price.discounted.value.centAmount;
        if (priceValue > maxPrice) {
          maxPrice = priceValue;
        } else if (priceValue < minPrice) {
          minPrice = priceValue;
        }
      } else if (price.value) {
        const priceValue = price.value.centAmount;
        if (priceValue > maxPrice) {
          maxPrice = priceValue;
        } else if (priceValue < minPrice) {
          minPrice = priceValue;
        }
      }
    });
  });

  const result: ParseResponse = {
    attributes: Object.fromEntries(Array.from(availableAttributes, ([key, value]) => [key, Array.from(value)])),
    priceRange: { min: minPrice / 100, max: maxPrice / 100 },
  };

  return result;
};

export const getProductsForParsing = createAsyncThunk(
  'catalog/getProductsForParsing',
  async (data: CatalogProps, { rejectWithValue }) => {
    try {
      const { token, filter, sort } = data;
      const res = await axios.get(`${API_URL}${PROJECT_KEY}/product-projections/search`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        params: {
          filter,
          sort,
          limit: ITEMS_FOR_PARSING,
          count: ITEMS_FOR_PARSING,
        },
      });
      const success: GetProductResponse = res.data;
      return convertParseData(success);
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
