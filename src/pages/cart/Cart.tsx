import { FC } from 'react';
import style from './Cart.module.css';
import { ProductListForCart } from 'widgets/ProductListInCart';
import { PriceListInCart } from 'widgets/PriceListInCart';

export const Cart: FC = () => {
  return (
    <div className={style.cover}>
      <ProductListForCart />
      <PriceListInCart />
    </div>
  );
};
