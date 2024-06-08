import { FC } from 'react';
import style from './Cart.module.css';
import { CartPreview } from 'widgets/CartPreview';

export const Cart: FC = () => {
  return (
    <>
      <div className={style.cover}>
        <CartPreview />
      </div>
    </>
  );
};
