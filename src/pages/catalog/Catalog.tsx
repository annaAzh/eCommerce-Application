import { FC, useEffect } from 'react';
import { FilterList } from 'features/FilterList';
import { LeftSideFilter } from 'widgets/LeftSideFilter';
import { NavMenu } from 'widgets/NavMenu';
import { ProductList } from 'widgets/ProductList';
import style from './Catalog.module.css';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import {
  clearSearchQuery,
  getAllProducts,
  getAvailableCategories,
  getProductError,
  getProductsForParsing,
  getSearchQuery,
} from 'entities/Product';
import { setNotificationMessage } from 'entities/NotificationTool';
import { CatalogBreadcrumb } from 'widgets/CatalogBreadcrumb';
import { PaginationCatalog } from 'widgets/PaginationCatalog';
import { getAccessToken } from 'entities/User';

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getProductError);
  const token = useAppSelector(getAccessToken);
  const searchQuery = useAppSelector(getSearchQuery);

  useEffect(() => {
    if (!token) return;
    if (!searchQuery?.categoriesId) {
      dispatch(getAllProducts({ token }));
      dispatch(getProductsForParsing({ token }));
    }
    dispatch(getAvailableCategories(token));

    return () => {
      dispatch(clearSearchQuery());
    };
  }, [token]);

  useEffect(() => {
    if (!error) return;
    dispatch(
      setNotificationMessage({
        message: error,
        type: 'error',
      }),
    );
  }, [error]);

  return (
    <>
      <NavMenu />
      <CatalogBreadcrumb />
      <div className={style.cover}>
        <LeftSideFilter />
        <div className={style.leftSide}>
          <FilterList />
          <ProductList />
          <PaginationCatalog />
        </div>
      </div>
    </>
  );
};
