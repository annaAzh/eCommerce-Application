import { getCart, applyPromoCode, removePromoCode } from 'entities/Cart';
import { getAccessToken } from 'entities/User';
import { PriceList } from 'features/ManageCartPrices';
import { FieldApplyPromoCode } from 'features/UsePromoCode';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks';
import style from './PriseListInCart.module.css';

export const PriceListInCart = () => {
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();
  const { lineItems, totalPrice, version, id, discountCodes } = useAppSelector(getCart);

  const applyCode = (code: string) => {
    if (token && id && version) dispatch(applyPromoCode({ code, token, cartId: id, version }));
  };

  const removeCode = () => {
    if (token && version && id && discountCodes)
      dispatch(removePromoCode({ token, version, cartId: id, idCode: discountCodes[0].discountCode.id }));
  };
  return (
    <>
      {lineItems && lineItems.length > 0 && totalPrice && discountCodes && (
        <div className={style.pricesAndInput}>
          <FieldApplyPromoCode applyCode={applyCode} removeCode={removeCode} discountCodes={discountCodes} />
          <PriceList totalAmount={totalPrice} lineItems={lineItems} />
        </div>
      )}
    </>
  );
};
