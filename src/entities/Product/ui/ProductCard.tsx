import { Product } from '../model/types/productTypes';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const { images, description, name, id } = product;
  return (
    <div className={styles.card}>
      <div className={styles.imageCover}>
        <img className={styles.image} src={images[0]} alt={id} />
      </div>
      <div>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export { ProductCard };
