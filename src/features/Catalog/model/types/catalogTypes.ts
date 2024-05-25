import { Product } from 'shared/types';

interface CatalogSchema {
  products: Product[];
  error?: string;
  isLoading: boolean;
}

interface GetProductResponse {
  results: ProductResponse[];
}
type ProductResponse = {
  id: string;
  masterData: {
    staged: {
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

export { CatalogSchema, GetProductResponse, Images, ProductResponse, Prices };
