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
} from 'entities/Product';
import { setNotificationMessage } from 'entities/NotificationTool';
import { CatalogBreadcrumb } from 'widgets/CatalogBreadcrumb';
import { PaginationCatalog } from 'widgets/PaginationCatalog';
import { getAccessToken } from 'entities/User';

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getProductError);
  const token = useAppSelector(getAccessToken);

  useEffect(() => {
    if (!token) return;
    dispatch(getAllProducts({ token }));
    dispatch(getAvailableCategories(token));
    dispatch(getProductsForParsing({ token }));
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
