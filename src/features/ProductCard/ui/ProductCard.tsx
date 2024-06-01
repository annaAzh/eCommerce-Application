import { Product } from 'shared/types';
import styles from './ProductCard.module.css';
import onSale from 'shared/assets/img/onSale.svg';

const ProductCard = ({ product, onClick }: { product: Product; onClick: (key: string) => void }): JSX.Element => {
  const { images, description, name, prices, key } = product;
  const { discountedPrice, currentPrice } = prices;
  const descMaxLength = 300;
  const firstImage = images[0];

  return (
    <div className={styles.card} onClick={() => onClick(key)}>
      <div className={styles.imageCover}>
        {discountedPrice ? <img className={styles.svg} src={onSale} /> : null}
        <img className={styles.image} src={firstImage} />
      </div>
      <div className={styles.descriptionCover}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>
          {description.length > descMaxLength ? description.slice(0, descMaxLength).concat('...') : description}
        </p>
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
  );
};

export { ProductCard };
