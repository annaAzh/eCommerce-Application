import { PriceFormat } from 'shared/types';
import { totalPriceConversion } from 'shared/lib/dataConverters';
import style from './PriceList.module.css';

export const PriceList = ({ totalAmount }: { totalAmount: PriceFormat | undefined }) => {
  if (!totalAmount) return;
  return (
    <div className={style.pricesCard}>
      <div className={style.totalAmount}>
        {'Total Amount:'}
        <h2>{totalPriceConversion(totalAmount)}</h2>
      </div>
    </div>
  );
};
