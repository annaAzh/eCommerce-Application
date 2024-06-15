import { LineItem } from 'entities/Cart';
import { amountOfDiscountOnSale } from './amountOfDiscountOnSale';

const lineItems: LineItem[] = [
  {
    id: '15',
    name: { 'en-US': 'item' },
    price: {
      discounted: {
        value: {
          centAmount: 6915,
          currencyCode: 'USD',
          fractionDigits: 2,
        },
      },
      value: {
        centAmount: 7030,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
    productId: '17',
    quantity: 10,
    totalPrice: {
      centAmount: 7030,
      currencyCode: 'USD',
      fractionDigits: 2,
    },
    variant: {
      images: [
        {
          dimensions: {
            h: 10,
            w: 10,
          },
          url: 'string',
        },
      ],
    },
    discountedPrice: {
      value: {
        centAmount: 6545,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
  },
];

const firstId = '11.50$';

test('test amountOfDiscountOnSale', () => {
  const result = amountOfDiscountOnSale(lineItems);
  expect(result).toBe(firstId);
});
