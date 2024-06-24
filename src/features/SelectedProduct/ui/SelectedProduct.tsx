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
import { SaleBlock } from './components/SaleBlock';
import { clearRemoteCart, getCart, getOriginalGoods } from 'entities/Cart';

export const SelectedProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const { productKey } = useParams<string>();
  const { name, description, prices, images, category, subCategory, id } = useAppSelector(getSelectedProduct);
  const isLoading = useAppSelector(getSelectedIsLoading);
  const { discountedPrice, currentPrice } = prices;
  const categories = useAppSelector(getAllCategories);
  const originalGoods = useAppSelector(getOriginalGoods);
  const cart = useAppSelector(getCart);
  const isChosen = originalGoods.has(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    dispatch(getAvailableCategories(token));
  }, [token]);

  useEffect(() => {
    if (!token || !productKey) return;
    dispatch(getProductByKey({ token, productKey }));
  }, [productKey, token, dispatch]);

  const breadcrumbsHandler = (categoriesId?: string) => {
    if (categoriesId) {
      dispatch(addSearchCategory({ categoriesId }));
      navigate(`/${Paths.catalog}`);
    }
  };

  const removeFromCartHandler = () => {
    const item: string | undefined = originalGoods.get(id);
    if (!token || !cart.id || !cart.version || !item) return;
    dispatch(clearRemoteCart({ token, cartId: cart.id, version: cart.version, lineItemId: [item] }));
  };

  const memoBreadcrumbs = useMemo(() => {
    const result: string | undefined = getSubCategory(categories, category, subCategory);
    return (
      <>
        {result ? (
          <Breadcrumbs
            useBasePaths={true}
            handler={breadcrumbsHandler}
            additionalPaths={[...getBreadcrumbPaths(categories, result), { title: name }]}
          />
        ) : (
          <Breadcrumbs useBasePaths={true} handler={breadcrumbsHandler} />
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
              <SaleBlock data={{ discountedPrice, currentPrice, id, isChosen, removeFromCartHandler }} />
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
