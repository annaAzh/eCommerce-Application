import { Images, PriceFormat, Prices } from 'shared/types';

interface CartSchema {
  cart: Partial<Cart>;
  error?: string;
  isLoading: boolean;
}

interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalPrice: PriceFormat;
  discountCodes?: DiscountCode[];
}

interface DiscountCode {
  discountCode: {
    id: string;
  };
}

interface LineItem {
  id: string;
  name: { 'en-US': string };
  price: Prices;
  productId: string;
  quantity: number;
  totalPrice: PriceFormat;
  variant: {
    images: Images[];
  };
  discountedPrice?: {
    value: PriceFormat;
  };
}

interface ActionCartProps {
  token: string;
  version: number;
  cartId: string;
  count?: number;
}

export { CartSchema, Cart, ActionCartProps, LineItem, DiscountCode };
