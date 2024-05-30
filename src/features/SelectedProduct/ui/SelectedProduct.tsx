import { getAccessToken } from 'entities/User';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByKey } from '../model/services/getSelectedProductByKey';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getSelectedIsLoading, getSelectedProduct } from '../model/selectors/selectedProductSelectors';
import { HashLoader } from 'react-spinners';
import parse from 'html-react-parser';
import styles from './SelectedProduct.module.css';
import { Slider } from 'shared/ui';

export const SelectedProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const { productKey } = useParams<string>();
  const { name, description, prices } = useAppSelector(getSelectedProduct);
  const isLoading = useAppSelector(getSelectedIsLoading);
  const navigate = useNavigate();
  const { discountedPrice, currentPrice } = prices;

  useEffect(() => {
    if (!token || !productKey) return;
    dispatch(getProductByKey({ token, productKey }));
  }, [productKey, token, dispatch]);

  function goBack(): void {
    navigate(-1);
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        <>
          <p className={styles.linkBack} onClick={goBack}>
            &#11013; Back
          </p>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.topBlock}>
            <div className={styles.slider}>
              <Slider />
            </div>
            <div className={styles.containerPrices}>
              {discountedPrice ? (
                <div>
                  <div className={`${styles.commonPriceClass} ${styles.discountedPrice}`}>{discountedPrice}</div>
                  <div className={`${styles.commonPriceClass} ${styles.crossedPrice}`}>{currentPrice}</div>
                </div>
              ) : (
                <div className={`${styles.commonPriceClass} ${styles.price}`}>{currentPrice}</div>
              )}
            </div>
          </div>
          <div>
            <p className={styles.titleDescription}>Description:</p>
            <p className={styles.description}>{parse(description)}</p>
          </div>
        </>
      )}
    </div>
  );
};
