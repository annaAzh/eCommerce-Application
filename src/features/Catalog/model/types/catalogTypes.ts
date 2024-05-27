import { Product } from 'shared/types';

interface CatalogSchema {
  products: Product[];
  categories: FormattedCategories[];
  error?: string;
  isLoading: boolean;
}

interface GetProductResponse {
  results: ProductResponse[];
}
type ProductResponse = {
  id: string;
  description: {
    'en-US'?: string;
  };
  name: {
    'en-US'?: string;
  };
  masterVariant: {
    images: Images[];
    prices: Prices[];
  };
};

type Prices = {
  discounted?: {
    value: {
      centAmount: number;
      currencyCode: CurrencyCodes;
      fractionDigits: number;
    };
  };
  value?: {
    centAmount: number;
    currencyCode: CurrencyCodes;
    fractionDigits: number;
  };
};

type CurrencyCodes = 'USD';
type Images = {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
};

type CatalogProps = {
  token: string;
  filter?: string;
  sort?: string;
  category?: string;
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

export {
  CatalogSchema,
  GetProductResponse,
  Images,
  ProductResponse,
  Prices,
  CatalogProps,
  GetCategoroesResponse,
  FormattedCategories,
};
