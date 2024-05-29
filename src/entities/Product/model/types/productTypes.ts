import { Product } from 'shared/types';
import { Images, Prices, SearchQueryProps } from 'shared/types/productTypes';

interface ProductSchema {
  products: Product[];
  categories: FormattedCategories[];
  attributes?: FormattedAttributesType;
  priceRange: { min: number; max: number };
  searchQueryProps?: SearchQueryProps;
  error?: string;
  isLoading: boolean;
}

interface GetProductResponse {
  results: ProductResponse[];
}

type ProductResponse = {
  id: string;
  key: string;
  description: {
    'en-US'?: string;
  };
  name: {
    'en-US'?: string;
  };
  masterVariant: {
    images: Images[];
    prices: Prices[];
    attributes: AttributesType[];
  };
};

type AttributesType = { name: string; value: string };

type CatalogProps = {
  token: string;
  filter?: string[] | string;
  sort?: string;
};

interface GetCategoroesResponse {
  results: CategoroesResponse[];
}

interface CategoroesResponse {
  id: string;
  name: {
    'en-US': string;
  };
  parent?: {
    id: string;
  };
}

interface FormattedCategories {
  id: string;
  name: string;
  subCategory: Omit<FormattedCategories, 'subCategory'>[];
}

interface FormattedAttributesType {
  [key: string]: string[];
}

interface ParseResponse {
  attributes: FormattedAttributesType;
  priceRange: { min: number; max: number };
}

export {
  ProductSchema,
  GetProductResponse,
  Images,
  ProductResponse,
  Prices,
  CatalogProps,
  GetCategoroesResponse,
  FormattedCategories,
  ParseResponse,
  FormattedAttributesType,
};
