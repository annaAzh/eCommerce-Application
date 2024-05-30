export { getAvailableCategories } from './model/services/getAvailableCategories';

export { getProductsForParsing } from './model/services/getProductsForParsing';

export { getAllProducts } from './model/services/getAllProducts';

export {
  getProducts,
  getProductIsLoading,
  getAllCategories,
  getPriceRange,
  getAttributes,
  getSearchQuery,
} from './model/selectors/productSelectors';

export {
  productReducer,
  addSearchSortBy,
  addSearchPriceRange,
  addSearchOptional,
  addSearchCategory,
  addSearchText,
} from './model/slices/productSlice';

export { ProductSchema, FormattedCategories } from './model/types/productTypes';
