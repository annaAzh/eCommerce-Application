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

interface SearchQueryProps {
  sortField?: 'name.en-US' | 'price';
  sortBy?: 'asc' | 'desc';
  categoriesId?: string;
  priceRange?: string;
  optionalFilters?: string[];
  search?: string;
  fuzzy?: boolean;
}

interface FormattedCategories {
  id: string;
  name: string;
  subCategory: Omit<FormattedCategories, 'subCategory'>[];
}

export { Product, Prices, Images, FormattedPrice, SearchQueryProps, FormattedCategories, CurrencyCodes };
