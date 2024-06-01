import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import styles from './ProductList.module.css';
import { HashLoader } from 'react-spinners';
import { ProductCard } from 'features/ProductCard';
import { getProducts, getProductIsLoading } from 'entities/Product';

const ProductList: FC = () => {
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductIsLoading);

  return (
    <div className={styles.productList}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
};

export { ProductList };
