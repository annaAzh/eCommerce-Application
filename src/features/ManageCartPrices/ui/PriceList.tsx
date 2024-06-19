import { PriceFormat } from 'shared/types';
import {
  amountOfDiscountByPromoCode,
  amountOfDiscountOnSale,
  totalPriceConversion,
  totalPriceWithoutDiscounts,
} from 'shared/lib/dataConverters';
import style from './PriceList.module.css';
import { LineItem } from 'entities/Cart';

export const PriceList = ({ totalAmount, lineItems }: { totalAmount: PriceFormat; lineItems: LineItem[] }) => {
  return (
    <div className={style.pricesCard}>
      <div className={style.amountNotDiscount}>
        {'Amount without discounts'}
        <h4>{totalPriceWithoutDiscounts(lineItems)}</h4>
      </div>
      <div className={style.amountNotDiscount}>
        {'Discount on Sale'}
        <h4>{amountOfDiscountOnSale(lineItems)}</h4>
      </div>
      <div className={style.amountNotDiscount}>
        {'Discount on Promo Code'}
        <h4>{amountOfDiscountByPromoCode(lineItems)}</h4>
      </div>
      <div className={style.totalAmount}>
        {'Total Amount:'}
        <h2>{totalPriceConversion(totalAmount)}</h2>
      </div>
    </div>
  );
};
