import { getAccessToken } from 'entities/User';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductByKey } from '../model/services/getSelectedProductByKey';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getSelectedIsLoading, getSelectedProduct } from '../model/selectors/selectedProductSelectors';
import { HashLoader } from 'react-spinners';
import parse from 'html-react-parser';
import styles from './SelectedProduct.module.css';
import { Breadcrumbs, Slider } from 'shared/ui';
import { Paths } from 'shared/types';
import { addSearchCategory, getAllCategories, getAvailableCategories } from 'entities/Product';
import { getBreadcrumbPaths, getSubCategory } from 'shared/lib/dataConverters';

export const SelectedProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const { productKey } = useParams<string>();
  const { name, description, prices, images, category, subCategory } = useAppSelector(getSelectedProduct);
  const isLoading = useAppSelector(getSelectedIsLoading);
  const { discountedPrice, currentPrice } = prices;
  const categories = useAppSelector(getAllCategories);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    dispatch(getAvailableCategories(token));
  }, [token]);

  useEffect(() => {
    if (!token || !productKey) return;
    dispatch(getProductByKey({ token, productKey }));
  }, [productKey, token, dispatch]);

  const handler = (id: string | undefined) => {
    if (id && id !== 'catalog') {
      navigate(`/${Paths.catalog}`);
      dispatch(addSearchCategory({ categoriesId: id }));
    } else {
      navigate(`/${Paths.catalog}`);
    }
  };

  const memoBreadcrumbs = useMemo(() => {
    const result: string | undefined = getSubCategory(categories, category, subCategory);
    return (
      <>
        {result ? (
          <Breadcrumbs
            useBasePaths={true}
            handler={handler}
            additionalPaths={[...getBreadcrumbPaths(categories, result), { title: name }]}
          />
        ) : (
          <Breadcrumbs useBasePaths={true} handler={handler} />
        )}
      </>
    );
  }, [categories, category]);

  return (
    <>
      {memoBreadcrumbs}
      <div className={styles.container}>
        {isLoading ? (
          <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
        ) : (
          <>
            <Link className={styles.linkBack} to={`/${Paths.catalog}`}>
              &#11013; Back
            </Link>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.topBlock}>
              <div className={styles.slider}>{images.length > 0 && <Slider images={images} />}</div>
              <div className={styles.containerPrices}>
                {discountedPrice ? (
                  <div>
                    <div className={`${styles.commonPriceClass} ${styles.crossedPrice}`}>{currentPrice}</div>
                    <div className={`${styles.commonPriceClass} ${styles.discountedPrice}`}>{discountedPrice}</div>
                  </div>
                ) : (
                  <div className={`${styles.commonPriceClass} ${styles.price}`}>{currentPrice}</div>
                )}
              </div>
            </div>
            <div>
              <p className={styles.titleDescription}>Description:</p>
              <div className={styles.description}>{parse(description)}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
