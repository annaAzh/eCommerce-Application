import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import styles from './ProductList.module.css';
import { HashLoader } from 'react-spinners';
import { ProductCard } from 'features/ProductCard';
import { getProducts, getProductIsLoading } from 'entities/Product';
import { clearCardError } from 'features/SelectedProduct';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks';

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductIsLoading);
  
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
