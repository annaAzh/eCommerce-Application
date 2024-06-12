import { PriceList } from 'features/ManageCartPrices';
import { InputApplyPromoCode } from 'features/UsePromoCode';
import { PriceFormat } from 'shared/types';
import style from './TotalListPrices.module.css';

export const TotalListPrices = ({ totalPrice }: { totalPrice: PriceFormat }) => {
  return (
    <div className={style.pricesAndInput}>
      <InputApplyPromoCode />
      <PriceList totalAmount={totalPrice} />
    </div>
  );
};
