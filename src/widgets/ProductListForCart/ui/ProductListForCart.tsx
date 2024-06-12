import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { LineItem, getExistCart } from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import ImgKitten from 'shared/assets/img/kittenForCart.png';
import style from './ProductListForCart.module.css';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/types';

export const ProductListForCart = ({ lineItems, token }: { lineItems: LineItem[]; token: string }) => {
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

  return <>{lineItems && addedProducts}</>;
};
