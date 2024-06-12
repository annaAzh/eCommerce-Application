import { FC } from 'react';
import style from './Cart.module.css';
import { ProductListForCart } from 'widgets/ProductListForCart';
import { getCart } from 'entities/Cart';
import { useAppSelector } from 'shared/lib/hooks';
import { TotalListPrices } from 'widgets/TotalListPrices';
import { getAccessToken } from 'entities/User';

export const Cart: FC = () => {
  const token = useAppSelector(getAccessToken);
  const { lineItems, totalPrice } = useAppSelector(getCart);

  return (
    <>
      <div className={style.cover}>
        {lineItems && token && <ProductListForCart lineItems={lineItems} token={token} />}
        {totalPrice && <TotalListPrices totalPrice={totalPrice} />}
      </div>
    </>
  );
};
