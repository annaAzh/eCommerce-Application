interface ProductSchema {
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

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  prices: FormattedPrice;
}

type FormattedPrice = { currentPrice: string; discountedPrice?: string };

export { ProductSchema, GetProductResponse, Product, Images, ProductResponse, Prices, FormattedPrice };
