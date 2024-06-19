import { LineItem } from 'entities/Cart';

export const amountOfDiscountOnSale = (lineItems: LineItem[]): string => {
  let sum = 0;
  let sumDiscount = 0;
  let sumNotDiscount = 0;

  lineItems.forEach((lineItem: LineItem) => {
    const discount = lineItem.price.discounted;
    const value = lineItem.price.value;
    if (discount && value) {
      sumDiscount += discount.value.centAmount * lineItem.quantity;
      sumNotDiscount += value.centAmount * lineItem.quantity;
    }
  });
  sum = sumNotDiscount - sumDiscount;
  const price = `${(sum / 100).toFixed(2)}$`;
  return price;
};
