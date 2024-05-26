import { Product } from 'shared/types';
import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const { images, description, name, prices, key } = product;
  const { discountedPrice, currentPrice } = prices;
  const navigate = useNavigate();
  const descMaxLength = 300;
  const firstImage = images[0];

  function getProduct(): void {
    navigate(`${key}`);
  }

  return (
    <div className={styles.card} onClick={getProduct}>
      <div className={styles.imageCover}>
        <img className={styles.image} src={firstImage} />
      </div>
      <div className={styles.descriptionCover}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>
          {description.length > descMaxLength ? description.slice(0, descMaxLength) : description}
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
