import { FC, useEffect, useMemo, useState } from 'react';
import styles from './FilterList.module.css';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import {
  addSearchOptional,
  addSearchPriceRange,
  addSearchSortBy,
  getAllProducts,
  getAttributes,
  getAvailableCategories,
  getPriceRange,
  getProductsForParsing,
  getSearchQuery,
} from 'entities/Product';
import { DefaultFilter, OptionalFilter, PriceRangeFilter } from 'shared/ui';
import { SearchQueryProps } from 'shared/types';

export const FilterList: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const priceRange = useAppSelector(getPriceRange);
  const attributes = useAppSelector(getAttributes);
  const searchQuery = useAppSelector(getSearchQuery);
  const [optionalFilters, setOptionalFilters] = useState<string[]>([]);

  const defaultFilterHandler = (data: Required<Pick<SearchQueryProps, 'sortField' | 'sortBy'>> | undefined) => {
    dispatch(addSearchSortBy(data));
  };

  const priceRamgeFilterHandler = (data: Required<Pick<SearchQueryProps, 'priceRange'>> | undefined) => {
    dispatch(addSearchPriceRange(data));
  };

  const optionalFilterHandler = (currentValue: string, prevValue?: string) => {
    if (prevValue) {
      if (currentValue) {
        setOptionalFilters((prevVariantFilter) => [
          ...prevVariantFilter.filter((value) => value !== prevValue),
          currentValue,
        ]);
      } else {
        setOptionalFilters((prevVariantFilter) => [...prevVariantFilter.filter((value) => value !== prevValue)]);
      }
    } else {
      setOptionalFilters((prevVariantFilter) => [...prevVariantFilter, currentValue]);
    }
  };

  useEffect(() => {
    dispatch(addSearchOptional({ optionalFilters }));
  }, [optionalFilters]);

  useEffect(() => {
    if (!token) return;
    let sort: string | undefined = undefined;
    let filter: string[] = [];
    if (searchQuery?.sortBy && searchQuery.sortField) sort = `${searchQuery.sortField} ${searchQuery.sortBy}`;
    if (searchQuery?.optionalFilters) filter = [...filter, ...searchQuery.optionalFilters];
    if (searchQuery?.priceRange) filter = [...filter, searchQuery?.priceRange];
    if (searchQuery?.categoriesId) filter = [...filter, searchQuery.categoriesId];

    if (searchQuery?.search && searchQuery.fuzzy) {
      const { search, fuzzy } = searchQuery;
      dispatch(getAllProducts({ token, sort, filter, search, fuzzy }));
    } else {
      dispatch(getAllProducts({ token, sort, filter }));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!token) return;
    dispatch(getAvailableCategories(token));
    dispatch(getProductsForParsing({ token }));
  }, [token]);

  useEffect(() => {
    if (!token || !searchQuery?.categoriesId) return;
    dispatch(getProductsForParsing({ token, filter: searchQuery?.categoriesId }));
  }, [searchQuery?.categoriesId]);

  const memoPriceRangeFilter = useMemo(() => {
    return <PriceRangeFilter minAndMax={priceRange} handleData={priceRamgeFilterHandler} />;
  }, [priceRange]);

  const memoOptionalFilter = useMemo(() => {
    if (!attributes || Object.entries(attributes).length === 0) {
      setOptionalFilters([]);
      dispatch(addSearchPriceRange(undefined));
      return;
    }
    const optionalFiltersArray = Object.entries(attributes);
    return (
      <>
        {optionalFiltersArray.map((filter, index) => (
          <OptionalFilter key={index} filter={filter} handleData={optionalFilterHandler} />
        ))}
      </>
    );
  }, [attributes]);

  return (
    <div className={styles.container}>
      <DefaultFilter handleData={defaultFilterHandler} />
      {memoPriceRangeFilter}
      {memoOptionalFilter}
    </div>
  );
};
