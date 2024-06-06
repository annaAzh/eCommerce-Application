import { CurrencyCodes, Images, Prices } from 'shared/types';

interface CartSchema {
  cart: Partial<Cart>;
  error?: string;
  isLoading: boolean;
}

type PriceFormat = { centAmount: number; currencyCode: CurrencyCodes; fractionDigits: number };

interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalPrice: PriceFormat;
}

interface LineItem {
  id: string;
  name: { 'en-US': string };
  price: Prices;
  productId: string;
  quantity: number;
  totalPrice: PriceFormat;
  variant: {
    images: Images;
  };
}

interface ActionCartProps {
  token: string;
  version: number;
  cartId: string;
  count?: number;
}

export { CartSchema, Cart, ActionCartProps, LineItem };
