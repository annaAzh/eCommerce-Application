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

type PriceFormat = { centAmount: number; currencyCode: CurrencyCodes; fractionDigits: number };

interface SearchQueryProps {
  sortField?: 'name.en-US' | 'price';
  sortBy?: 'asc' | 'desc';
  categoriesId?: string;
  priceRange?: string;
  optionalFilters?: string[];
  search?: string;
  fuzzy?: boolean;
  currentPage?: number;
}

interface FormattedCategories {
  id: string;
  name: string;
  subCategory: Omit<FormattedCategories, 'subCategory'>[];
}

interface AddToCartProps {
  id: string;
}

export {
  Product,
  Prices,
  Images,
  FormattedPrice,
  SearchQueryProps,
  FormattedCategories,
  CurrencyCodes,
  PriceFormat,
  AddToCartProps,
};
