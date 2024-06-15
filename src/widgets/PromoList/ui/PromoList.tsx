import { FC, useEffect } from 'react';
import style from './PromoList.module.css';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { AutoPlay } from '@egjs/flicking-plugins';
import { setNotificationMessage } from 'entities/NotificationTool';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getAccessToken } from 'entities/User';
import { takePromoCodes, getPromoCodes, PromoCode } from 'features/DisplayPromoCode';
import { Discount } from 'shared/types';
const plugins = [new AutoPlay({ duration: 3000, direction: 'NEXT', stopOnHover: true })];

export const PromoList: FC = () => {
  const token = useAppSelector(getAccessToken);
  const promoCodes = useAppSelector(takePromoCodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getPromoCodes(token));
  }, [token, dispatch]);

  const click = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        dispatch(
          setNotificationMessage({
            message: `code ${text} has been copied`,
            placement: 'top',
          }),
        );
      })
      .catch(() => {
        dispatch(
          setNotificationMessage({
            message: 'something has gone wrong and code hadn"t been copied',
            type: 'error',
          }),
        );
      });
  };

  return (
    <Flicking circular={true} renderOnlyVisible={true} plugins={plugins}>
      {promoCodes.map((promo: PromoCode, index: number) => {
        const name: keyof typeof Discount = promo.code as keyof typeof Discount;
        return (
          <div className={`${style[`item${index}`]} ${style.item}`} onClick={() => click(promo.code)} key={index}>
            <div className={style.promoCover}>
              <div className={style.description}> {`${promo.description['en-US']}`}</div>
              <div className={style.promo}>{`${Discount[name]}`}</div>
            </div>
            <div className={style.code}>{promo.code}</div>
          </div>
        );
      })}
    </Flicking>
  );
};
