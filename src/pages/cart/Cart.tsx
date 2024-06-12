import { FC } from 'react';
import style from './Cart.module.css';
import { ProductListForCart } from 'widgets/ProductListForCart';

export const Cart: FC = () => {
  return (
    <>
      <div className={style.cover}>
        <ProductListForCart />
      </div>
    </>
  );
};
