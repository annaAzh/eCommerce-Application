import { LineItem } from 'entities/Cart';

export const totalPriceWithoutDiscounts = (lineItems: LineItem[]): string => {
  let sum = 0;
  lineItems.forEach((lineItem: LineItem) => {
    const value = lineItem.price.value;
    if (value) sum += value.centAmount * lineItem.quantity;
  });
  const price = `${(sum / 100).toFixed(2)}$`;
  return price;
};
