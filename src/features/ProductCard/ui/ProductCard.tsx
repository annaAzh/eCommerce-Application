import { AddToCartProps, Product } from 'shared/types';
import styles from './ProductCard.module.css';
import onSale from 'shared/assets/img/onSale.svg';
import parse from 'html-react-parser';
import { FC } from 'react';

interface Props {
  product: Product;
  onClick: (key: string) => void;
  AddToCartBtn: FC<AddToCartProps>;
}

const ProductCard: FC<Props> = ({ product, onClick, AddToCartBtn }) => {
  const { images, description, name, prices, key, id } = product;
  const { discountedPrice, currentPrice } = prices;
  const descMaxLength = 300;
  const firstImage = images[0];

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
            <AddToCartBtn id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
