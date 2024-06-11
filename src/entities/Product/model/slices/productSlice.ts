import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductSchema, FormattedCategories, ParseResponse } from '../types/productTypes';
import { getAllProducts } from '../services/getAllProducts';
import { Product, SearchQueryProps } from 'shared/types';
import { getAvailableCategories } from '../services/getAvailableCategories';
import { getProductsForParsing } from '../services/getProductsForParsing';

const initialState: ProductSchema = {
  categories: [],
  priceRange: { min: 0, max: 100 },
  isLoading: false,
  error: undefined,
  total: 0,
  currentPage: 1,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addSearchSortBy(
      state: ProductSchema,
      { payload }: PayloadAction<Required<Pick<SearchQueryProps, 'sortField' | 'sortBy'>> | undefined>,
    ) {
      if (!payload) {
        if (state.searchQueryProps?.sortBy && state.searchQueryProps.sortField) {
          const { sortBy, sortField, ...rest } = state.searchQueryProps;
          state.searchQueryProps = { ...rest };
        }
      } else {
        const { sortBy, sortField } = payload;
        state.searchQueryProps = { ...state.searchQueryProps, sortBy, sortField };
      }
    },
    addSearchPriceRange(
      state: ProductSchema,
      { payload }: PayloadAction<Required<Pick<SearchQueryProps, 'priceRange'>> | undefined>,
    ) {
      if (!payload) {
        if (state.searchQueryProps?.priceRange) {
          const { priceRange, ...rest } = state.searchQueryProps;
          state.searchQueryProps = { ...rest };
        }
      } else {
        const { priceRange } = payload;
        state.searchQueryProps = { ...state.searchQueryProps, priceRange };
      }
    },
    addSearchOptional(
      state: ProductSchema,
      { payload }: PayloadAction<Required<Pick<SearchQueryProps, 'optionalFilters'>>>,
    ) {
      const { optionalFilters } = payload;
      state.searchQueryProps = { ...state.searchQueryProps, optionalFilters };
    },
    addSearchCategory(
      state: ProductSchema,
      { payload }: PayloadAction<Required<Pick<SearchQueryProps, 'categoriesId'>> | undefined>,
    ) {
      if (!payload) {
        if (state.searchQueryProps?.categoriesId) {
          const { categoriesId, ...rest } = state.searchQueryProps;
          state.searchQueryProps = { ...rest };
        }
      } else {
        const { categoriesId } = payload;
        state.searchQueryProps = { ...state.searchQueryProps, categoriesId };
      }
    },
    addSearchText(
      state: ProductSchema,
      { payload }: PayloadAction<Required<Pick<SearchQueryProps, 'search' | 'fuzzy'>> | undefined>,
    ) {
      if (!payload) {
        if (state.searchQueryProps?.search && state.searchQueryProps.fuzzy) {
          const { search, fuzzy, ...rest } = state.searchQueryProps;
          state.searchQueryProps = { ...rest };
        }
      } else {
        const { search, fuzzy } = payload;
        state.searchQueryProps = { ...state.searchQueryProps, search, fuzzy };
      }
    },
    clearSearchQuery(state: ProductSchema) {
      state.searchQueryProps = undefined;
    },
    changeCurrentPage(state: ProductSchema, action: PayloadAction<number>) {
      state.currentPage = action.payload;

      if (state.searchQueryProps) {
        state.searchQueryProps.currentPage = action.payload;
      } else {
        state.searchQueryProps = { currentPage: action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, { payload }: PayloadAction<{ result: Product[]; total: number }>) => {
        state.products = payload.result;
        state.total = payload.total;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(getAvailableCategories.fulfilled, (state, { payload }: PayloadAction<FormattedCategories[]>) => {
        state.categories = payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getAvailableCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAvailableCategories.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(getProductsForParsing.fulfilled, (state, { payload }: PayloadAction<ParseResponse>) => {
        state.attributes = payload.attributes;
        state.priceRange = payload.priceRange;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getProductsForParsing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsForParsing.rejected, (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { reducer: productReducer } = productSlice;

export const {
  addSearchSortBy,
  addSearchPriceRange,
  addSearchOptional,
  addSearchCategory,
  addSearchText,
  clearSearchQuery,
  changeCurrentPage,
} = productSlice.actions;
