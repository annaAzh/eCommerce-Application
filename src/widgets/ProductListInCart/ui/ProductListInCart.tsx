import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import {
  LineItem,
  addToCart,
  clearRemoteCart,
  getCart,
  getExistCart,
  getOriginalGoods,
  removeFromCart,
  removePromoCode,
} from 'entities/Cart';
import { ProductToCard } from 'features/ManageCartItemRow';
import ImgKitten from 'shared/assets/img/kittenForCart.png';
import { Link } from 'react-router-dom';
import { CallstackType, Paths } from 'shared/types';
import { getAccessToken } from 'entities/User';
import style from './ProductListInCart.module.css';

export const ProductListForCart = () => {
  const { lineItems, version, id: cartId, discountCodes } = useAppSelector(getCart);
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const originalGoods = useAppSelector(getOriginalGoods);
  const [callstack, setCallstack] = useState<CallstackType[]>([]);
  const [usedVersion, setUsedVersion] = useState<number>();

  const addToCallstack = (data: CallstackType) => {
    setCallstack((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (!callstack.length || !token || !cartId || !version || usedVersion === version) return;
    const line: CallstackType = callstack[0];
    const item: string | undefined = originalGoods.get(line.payload);
    setCallstack((prev) => prev.slice(1));

    if (!item) return;
    setUsedVersion(version);

    switch (line.type) {
      case 'add':
        dispatch(addToCart({ token, cartId, version, productId: line.payload }));
        break;
      case 'remove':
        dispatch(removeFromCart({ token, cartId, version, lineItemId: item }));
        break;
      case 'clear':
        dispatch(clearRemoteCart({ token, cartId, version, lineItemId: [item] }));
        break;
      default:
        dispatch(getExistCart(token));
    }
  }, [callstack, version]);

  useEffect(() => {
    if (!token) return;
    dispatch(getExistCart(token));
  }, [token]);

  useEffect(() => {
    if (!discountCodes || !discountCodes.length) return;
    if (lineItems && lineItems.length <= 0 && token && version && cartId) {
      dispatch(removePromoCode({ token, idCode: discountCodes[0].discountCode.id, version, cartId }));
    }
  }, [discountCodes]);

  const addedProducts = useMemo(() => {
    return lineItems && lineItems.length > 0 ? (
      <>
        <ol className={style.productList}>
          {lineItems.map((product: LineItem, index) => {
            return (
              <li key={index} className={style.productCart}>
                <ProductToCard product={product} handler={addToCallstack} />
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
