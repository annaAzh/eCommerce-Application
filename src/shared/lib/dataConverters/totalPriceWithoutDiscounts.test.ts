import { LineItem } from 'entities/Cart';
import { totalPriceWithoutDiscounts } from './totalPriceWithoutDiscounts';

const lineItems: LineItem[] = [
  {
    id: '15',
    name: { 'en-US': 'item' },
    price: {
      discounted: {
        value: {
          centAmount: 7,
          currencyCode: 'USD',
          fractionDigits: 2,
        },
      },
      value: {
        centAmount: 7,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
    productId: '17',
    quantity: 10,
    totalPrice: {
      centAmount: 7,
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
        centAmount: 7,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
    },
  },
];

const firstId = '0.70$';

test('test totalPriceWithoutDiscounts', () => {
  const result = totalPriceWithoutDiscounts(lineItems || lineItems[0]);
  expect(result).toBe(firstId);
});
