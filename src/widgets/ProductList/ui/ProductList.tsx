import { getAccessToken } from 'entities/User';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import styles from './ProductList.module.css';
import { HashLoader } from 'react-spinners';
import { ProductCard } from 'features/ProductCard';
import { getProducts, getProductIsLoading, getAllProducts } from 'entities/Product';
import { clearCardError } from 'features/SelectedProduct';
import { useNavigate } from 'react-router-dom';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(getAccessToken);
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductIsLoading);

  useEffect(() => {
    if (!token) return;
    dispatch(getAllProducts({ token }));
  }, [token]);

  function selectProduct(key: string): void {
    dispatch(clearCardError());
    navigate(`${key}`);
  }

  return (
    <div className={styles.productList}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} onClick={selectProduct} />)
      )}
    </div>
  );
};

export { ProductList };
