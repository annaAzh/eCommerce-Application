import { getCart, getOriginalGoods, createCart, addToCart } from 'entities/Cart';
import { getAccessToken } from 'entities/User';
import { FC, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { AddToCartProps } from 'shared/types';
import { GreenButtonWithPlus } from 'shared/ui';
import style from './AddToCart.module.css';

export const AddToCart: FC<AddToCartProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const cart = useAppSelector(getCart);
  const originalGoods = useAppSelector(getOriginalGoods);
  const isChosen = originalGoods.has(id);
  const [productId, setProductId] = useState<string>();
  const [usedId, setUsedId] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    if (!token) return;
    if (!productId) {
      setUsedId(new Set<string>());
      return;
    }

    if (!cart.id) {
      dispatch(createCart(token));
    } else {
      setTimeout(() => {
        setProductId(undefined);
      }, 200);

      if (!cart.version || usedId.has(id)) return;
      dispatch(addToCart({ token, productId: id, cartId: cart.id, version: cart.version }));
      setUsedId((prev) => prev.add(id));
    }
  }, [productId, cart]);

  const clickAddToCartHandler = () => {
    setProductId(id);
  };

  return (
    <div className={style.buttonCover}>
      {productId ? (
        <PulseLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={10} />
      ) : (
        <GreenButtonWithPlus disabled={isChosen} text="Add to Cart" handler={clickAddToCartHandler} />
      )}
    </div>
  );
};
