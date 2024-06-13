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
  codeId: string;
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
    value: DiscountedPrice;
  };
}

interface DiscountedPrice {
  centAmount: number;
}

interface ActionCartProps {
  token: string;
  version: number;
  cartId: string;
  count?: number;
}

export { CartSchema, Cart, ActionCartProps, LineItem, DiscountCode };
