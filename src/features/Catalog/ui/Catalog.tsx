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
import { getAllCategories, getAttributes, getPriceRange } from '../model/selectors/catalogSelectors';
import { getAvailableCategories } from '../model/services/getAvailableCategories';
import { getProductsForParsing } from '../model/services/getProductsForParsing';
import { OptionalFilter } from './components/OptionalFilter/OptionalFilter';

export interface CatalogUiProps {
  handleData: (str: string) => void;
}

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const categories = useAppSelector(getAllCategories);
  const priceRange = useAppSelector(getPriceRange);
  const attributes = useAppSelector(getAttributes);
  const [filters, setFilters] = useState<Omit<CatalogProps, 'token' | 'optionalFilter'>>();
  const [variantFilter, setVariantFilter] = useState<string[]>([]);

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
    setFilters({ category: value });
  };
  const optionalFilterHandler = (currentValue: string, prevValue?: string) => {
    if (prevValue) {
      setVariantFilter((prevVariantFilter) => [
        ...prevVariantFilter.filter((value) => value !== prevValue),
        currentValue,
      ]);
    } else {
      setVariantFilter((prevVariantFilter) => [...prevVariantFilter, currentValue]);
    }
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
    let variants: string[] = [];
    if (variantFilter.length > 0) variants = variantFilter;
    if (filter) variants.push(filter);
    if (category) variants.push(category);
    dispatch(getAllProducts({ token, sort, variantFilter: variants }));
  }, [filters]);

  useEffect(() => {
    if (!token) return;
    dispatch(getAllProducts({ token, variantFilter }));
  }, [variantFilter]);

  const memoNavMenu = useMemo(() => {
    return <NavMenu handleData={categoriesFilter} categories={categories} />;
  }, [categories]);

  const memoPriceRangeFilter = useMemo(() => {
    return <PriceRangeFilter minAndMax={priceRange} handleData={priceRangeFilter} />;
  }, [priceRange]);

  const memoOptionalFilter = useMemo(() => {
    if (!attributes || Object.entries(attributes).length === 0) return;
    const optionalFilters = Object.entries(attributes);
    return (
      <>
        {optionalFilters.map((filter, index) => (
          <OptionalFilter key={index} filter={filter} handleData={optionalFilterHandler} />
        ))}
      </>
    );
  }, [attributes]);

  return (
    <>
      {categories.length > 0 ? memoNavMenu : <div className={styles.nav}></div>}
      <div className={styles.container}>
        <DefaultFilter handleData={defaultFilterHandler} />
        {memoPriceRangeFilter}
        {memoOptionalFilter}
      </div>
    </>
  );
};
