import { FC, useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getAllProducts } from '../model/services/getAllProducts';
import { DefaultFilter } from './components/DefaultFilter/DefaultFilter';
import { CatalogProps } from '../model/types/catalogTypes';

export interface CatalogUiProps {
  handleData: (str: string) => void;
}

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);

  const [filters, setFilters] = useState<Omit<CatalogProps, 'token'>>();
  const priceRangeFilter = (str: string) => {
    setFilters({ ...filters, filter: str });
  };

  const defaultFilterHandler = (str: string) => {
    setFilters({ ...filters, sort: str });
  };

  useEffect(() => {
    if (!filters || !token) return;
    const { filter, sort } = filters;
    if (sort) {
      dispatch(getAllProducts({ token, sort, filter }));
    } else {
      dispatch(getAllProducts({ token, filter }));
    }
  }, [filters]);

  return (
    <div className={styles.container}>
      <DefaultFilter handleData={defaultFilterHandler} />
      <PriceRangeFilter handleData={priceRangeFilter} />
    </div>
  );
};
