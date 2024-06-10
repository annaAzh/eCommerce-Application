import { Product } from 'shared/types';
import styles from './ProductCard.module.css';
import onSale from 'shared/assets/img/onSale.svg';
import parse from 'html-react-parser';
import { GreenButtonWithPlus } from 'shared/ui';
import { addToCart, createCart, getCart, getOriginalGoods } from 'entities/Cart';
import { getAccessToken } from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useEffect, useMemo, useState } from 'react';
import { PulseLoader } from 'react-spinners';

const ProductCard = ({ product, onClick }: { product: Product; onClick: (key: string) => void }): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const cart = useAppSelector(getCart);
  const originalGoods = useAppSelector(getOriginalGoods);
  const { images, description, name, prices, key, id } = product;
  const { discountedPrice, currentPrice } = prices;
  const isChosen = originalGoods.has(id);
  const descMaxLength = 300;
  const firstImage = images[0];
  const [productId, setProductId] = useState<string>();
  const [usedId, setUsedId] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    if (!token || !productId) return;

    if (!cart.id) {
      dispatch(createCart(token));
    } else {
      setTimeout(() => {
        setProductId(undefined);
      }, 500);

      if (!cart.version || usedId.has(id)) return;
      dispatch(addToCart({ token, productId: id, cartId: cart.id, version: cart.version }));
      setUsedId((prev) => prev.add(id));
    }
  }, [productId, cart]);

  const clickHandler = () => {
    setProductId(id);
  };

  const memoBtn = useMemo(
    () => <GreenButtonWithPlus disabled={isChosen} text="Add to Cart" handler={clickHandler} />,
    [isChosen],
  );

  return (
    <div className={styles.card} onClick={() => onClick(key)}>
      <p className={styles.name}>{name}</p>
      <div className={styles.container}>
        <div className={styles.imageCover}>
          {discountedPrice ? <img className={styles.svg} src={onSale} /> : null}
          <img className={styles.image} src={firstImage} />
        </div>
        <div className={styles.descriptionCover}>
          <p className={styles.description}>
            {description.length > descMaxLength
              ? parse(description.slice(0, descMaxLength).concat('...'))
              : parse(description)}
          </p>
          {discountedPrice ? (
            <div>
              <div className={`${styles.commonPriceClass} ${styles.crossedPrice}`}>{currentPrice}</div>
              <div className={`${styles.commonPriceClass} ${styles.discountedPrice}`}>{discountedPrice}</div>
            </div>
          ) : (
            <div className={`${styles.commonPriceClass} ${styles.price}`}>{currentPrice}</div>
          )}
          <div className={styles.buttonCover} onClick={(e) => e.stopPropagation()}>
            {productId ? <PulseLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={10} /> : memoBtn}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
