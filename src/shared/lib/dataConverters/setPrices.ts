import { FormattedPrice, Prices } from 'shared/types';

export const setPrices = (prices: Prices): FormattedPrice => {
  const result: FormattedPrice = {
    currentPrice: '0$',
  };

  if (prices.value) {
    const { currencyCode, centAmount, fractionDigits } = prices.value;
    const currentCurrency = currencyCode === 'USD' ? '$' : '';
    const currentPrice = `${(centAmount / 100).toFixed(fractionDigits)}${currentCurrency}`;
    result.currentPrice = currentPrice;
  }

  if (prices.discounted) {
    const { currencyCode, centAmount, fractionDigits } = prices.discounted.value;
    const discountedCurrency = currencyCode === 'USD' ? '$' : '';
    const discountedPrice = `${(centAmount / 100).toFixed(fractionDigits)}${discountedCurrency}`;
    result.discountedPrice = discountedPrice;
  }

  return result;
};
