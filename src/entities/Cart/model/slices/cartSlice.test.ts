import { AddToCartProps, addToCart } from '../services/addToCart';
import { ClearRemoteCartProps, clearRemoteCart } from '../services/clearRemoteCart';
import { createCart } from '../services/createCart';
import { getExistCart } from '../services/getExistCart';
import { RemoveFromCartProps, removeFromCart } from '../services/removeFromCart';
import { Cart, CartSchema } from '../types/cartTypes';
import { cartReducer, clearCart } from './cartSlice';

const initialState: CartSchema = {
  cart: { id: 'test' },
  isLoading: false,
};

const token = 'test token';

const cart: Cart = {
  id: 'test',
  version: 1,
  lineItems: [],
  totalPrice: { centAmount: 1300, currencyCode: 'USD', fractionDigits: 2 },
};

const addToCartTestData: AddToCartProps = {
  token,
  version: 1,
  cartId: 'test',
  productId: 'another test',
};

const removeFromCartTestData: RemoveFromCartProps = {
  token,
  version: 1,
  cartId: 'test',
  lineItemId: 'another test',
};

const clearRemoteCartTestData: ClearRemoteCartProps = {
  token,
  version: 1,
  cartId: 'test',
  lineItemId: [],
};

describe('testing cart slice', () => {
  it('should return default state', () => {
    const state = cartReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });
  it('test clearCart reducer', () => {
    const state = cartReducer(initialState, { type: clearCart.type });
    expect(state.cart).toEqual({});
  });
  it('test createCart/fulfilled', () => {
    const state = cartReducer(initialState, createCart.fulfilled(cart, 'createCart/fulfilled', token));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.cart).toBeDefined();
    expect(state.cart).toEqual(cart);
  });
  it('test createCart/pending', () => {
    const state = cartReducer(initialState, createCart.pending('createCart/pending', token));
    expect(state.isLoading).toBeTruthy();
  });
  it('test getExistCart/fulfilled', () => {
    const state = cartReducer(initialState, getExistCart.fulfilled(cart, 'getExistCart/fulfilled', token));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.cart).toBeDefined();
    expect(state.cart).toEqual(cart);
  });
  it('test addToCart/fulfilled', () => {
    const state = cartReducer(initialState, addToCart.fulfilled(cart, 'addToCart/fulfilled', addToCartTestData));
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.cart).toBeDefined();
    expect(state.cart).toEqual(cart);
  });
  it('test addToCart/pending', () => {
    const state = cartReducer(initialState, addToCart.pending('addToCart/pending', addToCartTestData));
    expect(state.isLoading).toBeTruthy();
  });
  it('test removeFromCart/fulfilled', () => {
    const state = cartReducer(
      initialState,
      removeFromCart.fulfilled(cart, 'removeFromCart/fulfilled', removeFromCartTestData),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.cart).toBeDefined();
    expect(state.cart).toEqual(cart);
  });
  it('test removeFromCart/pending', () => {
    const state = cartReducer(initialState, removeFromCart.pending('removeFromCart/pending', removeFromCartTestData));
    expect(state.isLoading).toBeTruthy();
  });
  it('test clearRemoteCart/fulfilled', () => {
    const state = cartReducer(
      initialState,
      clearRemoteCart.fulfilled(cart, 'clearRemoteCart/fulfilled', clearRemoteCartTestData),
    );
    expect(state.error).toBeUndefined();
    expect(state.isLoading).toBeFalsy();
    expect(state.cart).toBeDefined();
    expect(state.cart).toEqual(cart);
  });
  it('test clearRemoteCart/pending', () => {
    const state = cartReducer(
      initialState,
      clearRemoteCart.pending('clearRemoteCart/pending', clearRemoteCartTestData),
    );
    expect(state.isLoading).toBeTruthy();
  });
});
