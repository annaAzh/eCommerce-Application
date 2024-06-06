import { FormattedPrice, Images, Prices } from 'shared/types/productTypes';

interface CardSchema {
  product: SelectedProduct;
  error?: ProductReject;
  isLoading: boolean;
}

interface SelectedProduct {
  id: string;
  key: string;
  name: string;
  description: string;
  images: string[];
  prices: FormattedPrice;
  category?: string;
  subCategory?: string;
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
      categories: { id: string; typeId: string }[];
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

export { CardSchema, ProductSelectedResponse, ProductReject, SelectedProduct };
