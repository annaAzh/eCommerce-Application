import { PriceFormat } from 'shared/types';

export const totalPriceConversion = (totalPrice: PriceFormat): string => {
  const { currencyCode, centAmount, fractionDigits } = totalPrice;
  const discountedCurrency = currencyCode === 'USD' ? '$' : '';
  const discountedPrice = `${(centAmount / 100).toFixed(fractionDigits)}${discountedCurrency}`;
  return discountedPrice;
};
