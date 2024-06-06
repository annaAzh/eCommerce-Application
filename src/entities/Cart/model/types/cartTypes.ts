interface CartSchema {
  cart: Partial<Cart>;
  error?: string;
  isLoading: boolean;
}

interface Cart {
  id: string;
  version: number;
}

interface ActionCartProps {
  token: string;
  version: number;
  cartId: string;
  count?: number;
}

export { CartSchema, Cart, ActionCartProps };
