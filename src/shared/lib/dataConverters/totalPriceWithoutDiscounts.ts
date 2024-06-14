import { LineItem } from 'entities/Cart';

export const totalPriceWithoutDiscounts = (lineItems: LineItem[] | LineItem): string => {
  let sum = 0;
  if (Array.isArray(lineItems)) {
    lineItems.forEach((lineItem: LineItem) => {
      const value = lineItem.price.value;
      if (value) sum += value.centAmount * lineItem.quantity;
    });
    const price = `${(sum / 100).toFixed(2)}$`;
    return price;
  } else {
    const value = lineItems.price.value;
    if (value) sum += value.centAmount * lineItems.quantity;
    const price = `${(sum / 100).toFixed(2)}$`;
    return price;
  }
};
