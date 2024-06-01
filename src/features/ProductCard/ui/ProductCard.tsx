import { Product } from 'shared/types';
import styles from './ProductCard.module.css';
import { useAppDispatch } from 'shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { clearCardError } from 'features/SelectedProduct';
import onSale from 'shared/assets/img/onSale.svg';
import parse from 'html-react-parser';

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const { images, description, name, prices, key } = product;
  const { discountedPrice, currentPrice } = prices;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const descMaxLength = 300;
  const firstImage = images[0];

  function selectProduct(): void {
    dispatch(clearCardError());
    navigate(`${key}`);
  }

  return (
    <div className={styles.card} onClick={selectProduct}>
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
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
