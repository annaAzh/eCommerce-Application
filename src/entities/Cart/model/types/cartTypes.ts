interface CartSchema {
  cart: Partial<Cart>;
  error?: string;
  isLoading: boolean;
}

interface Cart {
  id: string;
  version: number;
}

export { CartSchema, Cart };
