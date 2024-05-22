import { ProductCard, getAllProducts, getProductIsLoading, getProducts } from 'entities/Product';
import { getAccessToken } from 'entities/User';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import styles from './ProductList.module.css';
import { HashLoader } from 'react-spinners';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductIsLoading);

  useEffect(() => {
    if (!token) return;
    dispatch(getAllProducts(token));
  }, [token]);

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
