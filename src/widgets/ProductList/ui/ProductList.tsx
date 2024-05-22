import { ProductCard, getAllProducts, getProducts } from 'entities/Product';
import { getAccessToken } from 'entities/User';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import styles from './ProductList.module.css';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const products = useAppSelector(getProducts);

  useEffect(() => {
    if (!token) return;
    dispatch(getAllProducts(token));
  }, [token]);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export { ProductList };
