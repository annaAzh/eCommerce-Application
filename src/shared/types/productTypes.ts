interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  prices: FormattedPrice;
}

type FormattedPrice = { currentPrice: string; discountedPrice?: string };

export { Product, FormattedPrice };
