import { Product } from 'shared/types';
import { Images, Prices } from 'shared/types/productTypes';

interface ProductSchema {
  product: Product;
  error?: ProductReject;
  isLoading: boolean;
}

type ProductSelectedResponse = {
  id: string;
  key: string;
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

interface ProductReject {
  statusCode: number;
  message: string;
  errors: [
    {
      code: string;
      message: string;
    },
  ];
}

export { ProductSchema, ProductSelectedResponse, ProductReject };
