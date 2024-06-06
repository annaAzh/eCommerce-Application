import { Product } from 'shared/types';
import styles from './ProductCard.module.css';
import onSale from 'shared/assets/img/onSale.svg';
import parse from 'html-react-parser';
import { PrimaryControlButton } from 'shared/ui';
import { addToCart, createCart, getCart } from 'entities/Cart';
import { getAccessToken } from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useEffect, useState } from 'react';

const ProductCard = ({ product, onClick }: { product: Product; onClick: (key: string) => void }): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const cart = useAppSelector(getCart);
  const { images, description, name, prices, key, id } = product;
  const { discountedPrice, currentPrice } = prices;
  const descMaxLength = 300;
  const firstImage = images[0];
  const [productId, setProductId] = useState<string>();

  useEffect(() => {
    if (!token || !productId) return;

    if (!cart.id) {
      dispatch(createCart(token));
    } else {
      if (!cart.version) return;
      dispatch(addToCart({ token, productId: id, cartId: cart.id, version: cart.version }));
      setProductId(undefined);
    }
  }, [productId, cart]);

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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryControlButton
              onClick={(e) => {
                e.stopPropagation();
                setProductId(id);
              }}
            >
              add
            </PrimaryControlButton>
          </div>

          {discountedPrice ? (
            <div>
              <div className={`${styles.commonPriceClass} ${styles.crossedPrice}`}>{currentPrice}</div>
              <div className={`${styles.commonPriceClass} ${styles.discountedPrice}`}>{discountedPrice}</div>
            </div>
          ) : (
            <div className={`${styles.commonPriceClass} ${styles.price}`}>{currentPrice}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
