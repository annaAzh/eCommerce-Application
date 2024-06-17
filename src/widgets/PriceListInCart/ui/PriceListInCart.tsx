import { getCart, applyPromoCode, removePromoCode, clearRemoteCart, getOriginalGoods } from 'entities/Cart';
import { getAccessToken } from 'entities/User';
import { PriceList } from 'features/ManageCartPrices';
import { FieldApplyPromoCode } from 'features/UsePromoCode';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks';
import style from './PriseListInCart.module.css';
import { ClearCart } from 'features/ClearCart';

export const PriceListInCart = () => {
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();
  const { lineItems, totalPrice, version, id: cartId, discountCodes } = useAppSelector(getCart);
  const originalGoods = useAppSelector(getOriginalGoods);

  const applyCode = (code: string) => {
    if (token && cartId && version && code.trim().length) dispatch(applyPromoCode({ code, token, cartId, version }));
  };

  const removeCode = () => {
    if (token && version && cartId && discountCodes)
      dispatch(removePromoCode({ token, version, cartId, idCode: discountCodes[0].discountCode.id }));
  };

  const clearCart = () => {
    if (!token || !cartId || !version) return;
    const lineItemId: string[] = [];

    originalGoods.forEach((value) => lineItemId.push(value));
    dispatch(clearRemoteCart({ token, cartId, version, lineItemId }));
  };

  return (
    <>
      {lineItems && lineItems.length > 0 && totalPrice && discountCodes && (
        <div className={style.pricesAndInput}>
          <h2 className={style.title}>{'Your Cart'}</h2>
          <FieldApplyPromoCode applyCode={applyCode} removeCode={removeCode} discountCodes={discountCodes} />
          <PriceList totalAmount={totalPrice} lineItems={lineItems} />
          <ClearCart handler={clearCart} />
        </div>
      )}
    </>
  );
};
