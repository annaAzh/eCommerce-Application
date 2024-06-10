import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { LineItem, getCart, getExistCart } from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import { getAccessToken } from 'entities/User';
import ImgKitten from 'shared/assets/img/kittenForCart.png';
import { PriceList } from 'features/ManageCartPrices';
import style from './CartPreview.module.css';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/types';

export const CartPreview: FC = () => {
  const { lineItems, totalPrice } = useAppSelector(getCart);
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getExistCart(token));
  }, [token, dispatch]);

  const addedProducts = useMemo(() => {
    return lineItems && lineItems.length > 0 ? (
      <>
        <ol className={style.productList}>
          {lineItems.map((product: LineItem, index) => {
            return (
              <li key={index} className={style.productCart}>
                <ProductToCard product={product} />
              </li>
            );
          })}
        </ol>
        {totalPrice && <PriceList totalAmount={totalPrice} />}
      </>
    ) : (
      <div className={style.cartEmpty}>
        <div className={style.messageCartEmpty}>
          <p>{'Your cart is empty'}</p>
          <p>{'We need to fix this!'}</p>
          <Link to={`/${Paths.catalog}`} className={style.linkCatalog}>
            &#10149; Catalog
          </Link>
        </div>
        <img className={style.imgCartEmpty} src={ImgKitten}></img>
      </div>
    );
  }, [lineItems]);

  return <div className={style.container}>{addedProducts}</div>;
};
