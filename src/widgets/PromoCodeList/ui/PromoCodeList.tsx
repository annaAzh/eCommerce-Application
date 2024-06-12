import { useEffect } from 'react';
import { getAccessToken } from 'entities/User';
import { PromoCode, getPromoCodes, takePromoCodes } from 'features/UsePromoCode';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { DISCOUNT } from 'shared/types';
import style from './PromoCodeList.module.css';

export const PromoCodeList = () => {
  const token = useAppSelector(getAccessToken);
  const promoCodes = useAppSelector(takePromoCodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getPromoCodes(token));
  }, [token, dispatch]);

  return (
    <div className={style.containerPromoCodes}>
      {promoCodes.map((promo: PromoCode, index: number) => {
        const name: keyof typeof DISCOUNT = promo.code as keyof typeof DISCOUNT;
        return (
          <div key={index} className={style.promoCode}>
            <div className={style.promoCodeName}>
              <p className={style.promoCodeDiscount}>{`${DISCOUNT[name]}*`}</p>
              <div className={style.promoCodeWord}>{promo.code}</div>
            </div>
            <div className={style.promoCodeDescription}>{`*${promo.description['en-US']}`}</div>
          </div>
        );
      })}
    </div>
  );
};
