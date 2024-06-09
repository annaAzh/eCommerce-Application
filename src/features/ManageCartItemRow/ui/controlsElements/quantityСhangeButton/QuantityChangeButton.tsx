import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import style from './QuantityChangeButton.module.css';
import { addToCart, getCart, removeFromCart } from 'entities/Cart';
import { getAccessToken } from 'entities/User';

export const QuantityChangeButton = ({
  lineItemId,
  number,
  productId,
}: {
  lineItemId: string;
  number: number;
  productId: string;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const cart = useAppSelector(getCart);

  const reduceQuantity = () => {
    if (token && cart.id && cart.version)
      dispatch(
        removeFromCart({
          token,
          lineItemId,
          cartId: cart.id,
          version: cart.version,
        }),
      );
  };

  const addQuantity = () => {
    if (token && cart.id && cart.version)
      dispatch(
        addToCart({
          token,
          productId,
          cartId: cart.id,
          version: cart.version,
        }),
      );
  };

  return (
    <div className={style.buttonQuantity}>
      <button type="button" className={style.buttonRemove} onClick={reduceQuantity}>
        {'-'}
      </button>
      <input
        type="button"
        step={1}
        min={0}
        max={100}
        value={number}
        inputMode="numeric"
        className={style.inputNumber}
      ></input>
      <button type="button" className={style.buttonAdd} onClick={addQuantity}>
        {'+'}
      </button>
    </div>
  );
};
