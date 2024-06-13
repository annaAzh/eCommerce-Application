import { FC } from 'react';
import style from './Cart.module.css';
import { ProductListForCart } from 'widgets/ProductListForCart';
import { getCart } from 'entities/Cart';
import { useAppSelector } from 'shared/lib/hooks';
import { getAccessToken } from 'entities/User';
import { FieldApplyPromoCode } from 'features/UsePromoCode';
import { PriceList } from 'features/ManageCartPrices';

export const Cart: FC = () => {
  const token = useAppSelector(getAccessToken);
  const { lineItems, totalPrice, version, id, discountCodes } = useAppSelector(getCart);

  return (
    <>
      {lineItems && token && version && id && totalPrice && discountCodes && (
        <div className={style.cover}>
          <ProductListForCart lineItems={lineItems} token={token} />
          <div className={style.pricesAndInput}>
            <FieldApplyPromoCode version={version} token={token} id={id} discountCodes={discountCodes} />
            <PriceList totalAmount={totalPrice} lineItems={lineItems} />
          </div>
        </div>
      )}
    </>
  );
};
