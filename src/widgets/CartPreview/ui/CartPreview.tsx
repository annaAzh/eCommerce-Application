import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { LineItem, getCart, getExistCart } from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import { getAccessToken } from 'entities/User';
import ImgKitten from 'shared/assets/img/kittenForCart.png';
import style from './CartPreview.module.css';

export const CartPreview: FC = () => {
  const { lineItems } = useAppSelector(getCart);
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getExistCart(token));
  }, [token, dispatch]);

  const addedProducts = useMemo(() => {
    return lineItems && lineItems.length > 0 ? (
      <ol className={style.productList}>
        {lineItems.map((product: LineItem, index) => {
          return (
            <li key={index} className={style.productCart}>
              <ProductToCard product={product} />
            </li>
          );
        })}
      </ol>
    ) : (
      <div className={style.cartEmpty}>
        <h2 className={style.messageCartEmpty}>{'Your cart is empty'}</h2>
        <img className={style.imgCartEmpty} src={ImgKitten}></img>
      </div>
    );
  }, [lineItems]);

  return <div className={style.container}>{addedProducts}</div>;
};
