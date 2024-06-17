import { LineItem } from 'entities/Cart';

export const amountOfDiscountByPromoCode = (lineItems: LineItem[]) => {
  let sum = 0;
  let sumDiscount = 0;
  let sumNotDiscount = 0;

  lineItems.forEach((lineItem: LineItem) => {
    const discount = lineItem.discountedPrice;
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
