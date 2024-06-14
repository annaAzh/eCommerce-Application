import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { LineItem, clearRemoteCart, getCart, getExistCart, removePromoCode } from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import ImgKitten from 'shared/assets/img/kittenForCart.png';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/types';
import { getAccessToken } from 'entities/User';
import style from './ProductListInCart.module.css';

export const ProductListForCart = () => {
  const { lineItems, version, id, discountCodes } = useAppSelector(getCart);
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);

  useEffect(() => {
    if (!token) return;
    dispatch(getExistCart(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (!discountCodes) return;
    if (discountCodes && discountCodes.length > 0) {
      if (lineItems && lineItems.length <= 0 && token && version && id) {
        dispatch(removePromoCode({ token, idCode: discountCodes[0].discountCode.id, version, cartId: id }));
      }
    }
  }, [discountCodes]);

  const deleteProduct = (itemId: string) => {
    if (token && id && version) {
      dispatch(clearRemoteCart({ token, version: version, cartId: id, lineItemId: [itemId] }));
    }
  };

  const addedProducts = useMemo(() => {
    return lineItems && lineItems.length > 0 ? (
      <>
        <ol className={style.productList}>
          {lineItems.map((product: LineItem, index) => {
            return (
              <li key={index} className={style.productCart}>
                <ProductToCard deleteProduct={deleteProduct} product={product} />
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

  return <>{addedProducts}</>;
};
