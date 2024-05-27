import { FC, useEffect, useMemo, useState } from 'react';
import styles from './Catalog.module.css';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getAllProducts } from '../model/services/getAllProducts';
import { DefaultFilter } from './components/DefaultFilter/DefaultFilter';
import { CatalogProps } from '../model/types/catalogTypes';
import { NavMenu } from 'shared/ui/NavMenu/NavMenu';
import { getAllCategories, getPriceRange } from '../model/selectors/catalogSelectors';
import { getAvailableCategories } from '../model/services/getAvailableCategories';
import { getProductsForParsing } from '../model/services/getProductsForParsing';

export interface CatalogUiProps {
  handleData: (str: string) => void;
}

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const categories = useAppSelector(getAllCategories);
  const priceRange = useAppSelector(getPriceRange);
  const [filters, setFilters] = useState<Omit<CatalogProps, 'token'>>();

  const priceRangeFilter = (value: string) => {
    setFilters({ ...filters, filter: value });
  };
  const defaultFilterHandler = (value: string) => {
    if (!value && filters) {
      const { sort, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, sort: value });
    }
  };
  const categoriesFilter = (value: string) => {
    setFilters({ ...filters, category: value });
  };

  useEffect(() => {
    if (!token) return;
    dispatch(getAvailableCategories(token));
    dispatch(getProductsForParsing({ token }));
  }, [token]);

  useEffect(() => {
    if (!token || !filters) return;
    const { category } = filters;
    dispatch(getProductsForParsing({ token, category }));
  }, [filters?.category]);

  useEffect(() => {
    if (!filters || !token) return;
    const { filter, sort, category } = filters;
    dispatch(getAllProducts({ token, sort, filter, category }));
  }, [filters]);

  const navMenu = useMemo(() => {
    return <NavMenu handleData={categoriesFilter} categories={categories} />;
  }, [categories]);

  const memoPriceRangeFilter = useMemo(() => {
    return <PriceRangeFilter minAndMax={priceRange} handleData={priceRangeFilter} />;
  }, [priceRange]);

  return (
    <>
      {categories.length > 0 ? navMenu : <div className={styles.nav}></div>}
      <div className={styles.container}>
        <DefaultFilter handleData={defaultFilterHandler} />
        {memoPriceRangeFilter}
      </div>
    </>
  );
};
