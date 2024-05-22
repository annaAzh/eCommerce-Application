import { Product } from '../model/types/productTypes';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const { images, description, name } = product;
  const firstImage = images[0];
  return (
    <div className={styles.card}>
      <div className={styles.imageCover}>
        <img className={styles.image} src={firstImage} />
      </div>
      <div className={styles.descriptionCover}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export { ProductCard };
