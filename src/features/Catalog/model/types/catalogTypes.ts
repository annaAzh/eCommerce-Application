import { Product } from 'shared/types';
import { Images, Prices } from 'shared/types/productTypes';

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
  };
};

type CatalogProps = {
  token: string;
  filter?: string;
  sort?: string;
};

export { CatalogSchema, GetProductResponse, ProductResponse, CatalogProps };
