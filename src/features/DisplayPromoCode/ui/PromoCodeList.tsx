import { useEffect } from 'react';
import { getAccessToken } from 'entities/User';
import { PromoCode, getPromoCodes, takePromoCodes } from 'features/DisplayPromoCode';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { Discount } from 'shared/types';
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
    <div className={style.wrapper}>
      <h2 className={style.title}>{'Discount Code'}</h2>
      <div className={style.containerPromoCodes}>
        {promoCodes.map((promo: PromoCode, index: number) => {
          const name: keyof typeof Discount = promo.code as keyof typeof Discount;
          return (
            <div key={index} className={style.promoCode}>
              <div className={style.promoCodeName}>
                <p className={style.promoCodeDiscount}>{`${Discount[name]}*`}</p>
                <div className={style.promoCodeWord}>{promo.code}</div>
              </div>
              <div className={style.promoCodeDescription}>{`*${promo.description['en-US']}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
