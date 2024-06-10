import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { LineItem, getCart, getExistCart } from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import { getAccessToken } from 'entities/User';
import { PriceList } from 'features/ManageCartPrices';
import style from './CartPreview.module.css';

export const CartPreview: FC = () => {
  const { lineItems, totalPrice } = useAppSelector(getCart);
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getExistCart(token));
  }, [token, dispatch]);

  const addedProducts = useMemo(() => {
    if (!lineItems) return;
    return lineItems.map((product: LineItem, index) => {
      return (
        <li key={index} className={style.productCart}>
          <ProductToCard product={product} />
        </li>
      );
    });
  }, [lineItems]);

  return (
    <div className={style.container}>
      <ol className={style.productList}>{addedProducts}</ol>
      {totalPrice && <PriceList totalAmount={totalPrice} />}
    </div>
  );
};
