import { FC, useEffect, useMemo, useState } from 'react';
import styles from './Catalog.module.css';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getAllProducts } from '../model/services/getAllProducts';
import { DefaultFilter } from './components/DefaultFilter/DefaultFilter';
import { CatalogProps } from '../model/types/catalogTypes';
import { NavMenu } from './components/NavMenu/NavMenu';
import { getAllCategories } from '../model/selectors/catalogSelectors';
import { getAvailableCategories } from '../model/services/getAvailableCategories';

export interface CatalogUiProps {
  handleData: (str: string) => void;
}

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const categories = useAppSelector(getAllCategories);
  const [filters, setFilters] = useState<Omit<CatalogProps, 'token'>>();

  useEffect(() => {
    if (!token) return;
    dispatch(getAvailableCategories(token));
  }, [token, dispatch]);

  const priceRangeFilter = (str: string) => {
    setFilters({ ...filters, filter: str });
  };
  const defaultFilterHandler = (str: string) => {
    if (!str && filters) {
      const { sort, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, sort: str });
    }
  };
  const categoriesFilter = (value: string) => {
    setFilters({ ...filters, category: `categories.id:"${value}"` });
  };

  useEffect(() => {
    if (!filters || !token) return;
    const { filter, sort, category } = filters;
    dispatch(getAllProducts({ token, sort, filter, category }));
  }, [filters]);

  const navMenu = useMemo(() => {
    return <NavMenu handleData={categoriesFilter} categories={categories} />;
  }, [categories]);

  return (
    <>
      {categories.length > 0 ? navMenu : <div className={styles.nav}></div>}
      <div className={styles.container}>
        <DefaultFilter handleData={defaultFilterHandler} />
        <PriceRangeFilter handleData={priceRangeFilter} />
      </div>
    </>
  );
};
