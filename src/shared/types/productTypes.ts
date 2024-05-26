interface Product {
  id: string;
  key: string;
  name: string;
  description: string;
  images: string[];
  prices: FormattedPrice;
}

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

type FormattedPrice = { currentPrice: string; discountedPrice?: string };

export { Product, Prices, Images, FormattedPrice };
