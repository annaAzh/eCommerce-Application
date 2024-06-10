import { FC } from 'react';
import style from './SaleBlock.module.css';
import { AddToCart } from 'features/AddToCart';

interface Props {
  data: {
    discountedPrice?: string;
    currentPrice: string;
    id: string;
  };
}

export const SaleBlock: FC<Props> = ({ data }) => {
  const { discountedPrice, currentPrice, id } = data;

  return (
    <div className={style.cartManage}>
      <div className={style.containerPrices}>
        {discountedPrice ? (
          <div>
            <div className={`${style.commonPriceClass} ${style.crossedPrice}`}>{currentPrice}</div>
            <div className={`${style.commonPriceClass} ${style.discountedPrice}`}>{discountedPrice}</div>
          </div>
        ) : (
          <div className={`${style.commonPriceClass} ${style.price}`}>{currentPrice}</div>
        )}
      </div>
      <AddToCart id={id} />
    </div>
  );
};
