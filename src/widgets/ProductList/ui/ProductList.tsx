import { FC, useMemo } from 'react';
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

  const productList = useMemo(() => {
    if (!products) return;
    return products.length > 0 ? (
      <div className={styles.listWrapper}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={selectProduct} />
        ))}
      </div>
    ) : (
      <div className={styles.emptySearch}>Sorry but we have not been able to find anything</div>
    );
  }, [products]);

  return (
    <div className={styles.productList}>
      {isLoading ? <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} /> : productList}
    </div>
  );
};

export { ProductList };
