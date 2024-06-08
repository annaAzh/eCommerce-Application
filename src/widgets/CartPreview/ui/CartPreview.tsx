import { FC, useEffect, useMemo } from 'react';
import style from './CartPreview.module.css';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { LineItem, getCart, getExistCart } from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import { getAccessToken } from 'entities/User';

export const CartPreview: FC = () => {
  const { lineItems } = useAppSelector(getCart);
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
    </div>
  );
};