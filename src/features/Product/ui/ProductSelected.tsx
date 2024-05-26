import { getAccessToken } from 'entities/User';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getProductByKey } from '../model/services/getProductByKey';
import { getSelectedIsLoading, getSelectedProduct } from '../model/selectors/productSelectors';
import { HashLoader } from 'react-spinners';
import parse from 'html-react-parser';
import styles from './Product.module.css';

export const SelectedProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const { productKey } = useParams();
  const { name, description, images, prices, id } = useAppSelector(getSelectedProduct);
  const isLoading = useAppSelector(getSelectedIsLoading);
  const { discountedPrice, currentPrice } = prices;

  useEffect(() => {
    if (!token || !productKey) return;
    dispatch(getProductByKey({ token, productKey }));
  }, [productKey, token, dispatch]);

  return (
    <div className={styles.container}>
      {isLoading || !id ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        <>
          <div className={styles.leftSide}>
            {images.map((url: string, index: number) => (
              <img className={styles.image} key={index} src={url}></img>
            ))}
          </div>
          <div className={styles.rightSide}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>{parse(description)}</p>
            {discountedPrice ? (
              <div>
                <div className={`${styles.commonPriceClass} ${styles.crossedPrice}`}>{currentPrice}</div>
                <div className={`${styles.commonPriceClass} ${styles.discountedPrice}`}>{discountedPrice}</div>
              </div>
            ) : (
              <div className={`${styles.commonPriceClass} ${styles.price}`}>{currentPrice}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
