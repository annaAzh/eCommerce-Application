import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetProdactResponse, Images, Product, ProductResponse } from '../types/productTypes';

const PROJECT_KEY = process.env.PROJECT_KEY;
const API_URL = process.env.API_URL;

const convertDataIntoAppropriateFormat = (prodacts: GetProdactResponse): Product[] => {
  const result: Product[] = [];

  prodacts.results.forEach((prodact: ProductResponse) => {
    const basePath = prodact.masterData.staged;
    const images: string[] = [];

    basePath.masterVariant.images.forEach((image: Images) => {
      images.push(image.url);
    });

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

export const getProducts = createAsyncThunk('product/getProducts', async (token: string, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}${PROJECT_KEY}/products`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const success: GetProdactResponse = res.data;
    return convertDataIntoAppropriateFormat(success);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
