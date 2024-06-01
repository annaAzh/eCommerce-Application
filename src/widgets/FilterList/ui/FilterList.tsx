import { FC, useEffect, useMemo, useState } from 'react';
import styles from './FilterList.module.css';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import {
  addSearchOptional,
  addSearchPriceRange,
  addSearchSortBy,
  clearSearchQuery,
  getAllProducts,
  getAttributes,
  getAvailableCategories,
  getPriceRange,
  getProductsForParsing,
  getSearchQuery,
} from 'entities/Product';
import { DefaultFilter, OptionalFilter, PriceRangeFilter } from 'shared/ui';
import { SearchQueryProps } from 'shared/types';
import { createSortAndSearchQuery } from 'shared/lib/dataConverters';

export const FilterList: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const priceRange = useAppSelector(getPriceRange);
  const attributes = useAppSelector(getAttributes);
  const searchQuery = useAppSelector(getSearchQuery);
  const [optionalFilters, setOptionalFilters] = useState<string[] | undefined>();

  const defaultFilterHandler = (data: Required<Pick<SearchQueryProps, 'sortField' | 'sortBy'>> | undefined) => {
    dispatch(addSearchSortBy(data));
  };

  const priceRamgeFilterHandler = (data: Required<Pick<SearchQueryProps, 'priceRange'>> | undefined) => {
    dispatch(addSearchPriceRange(data));
  };

  const optionalFilterHandler = (currentValue: string, prevValue?: string) => {
    if (prevValue) {
      if (currentValue) {
        setOptionalFilters((prevVariantFilter) =>
          prevVariantFilter
            ? [...prevVariantFilter.filter((value) => value !== prevValue), currentValue]
            : [currentValue],
        );
      } else {
        setOptionalFilters((prevVariantFilter) =>
          prevVariantFilter ? [...prevVariantFilter.filter((value) => value !== prevValue)] : [],
        );
      }
    } else {
      setOptionalFilters((prevVariantFilter) =>
        prevVariantFilter ? [...prevVariantFilter, currentValue] : [currentValue],
      );
    }
  };

  useEffect(() => {
    console.log(optionalFilters);
    if (!optionalFilters) return;
    console.log(optionalFilters);
    dispatch(addSearchOptional({ optionalFilters }));
  }, [optionalFilters]);

  useEffect(() => {
    if (!token || !searchQuery) return;
    dispatch(getAllProducts(createSortAndSearchQuery(token, searchQuery)));
  }, [searchQuery?.sortBy, searchQuery?.optionalFilters, searchQuery?.priceRange, searchQuery?.search]);

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
    if (!token || !searchQuery?.categoriesId) return;
    dispatch(addSearchPriceRange(undefined));
    setOptionalFilters([]);
    dispatch(getProductsForParsing({ token, filter: searchQuery?.categoriesId }));
  }, [searchQuery?.categoriesId]);

  const memoPriceRangeFilter = useMemo(() => {
    return <PriceRangeFilter minAndMax={priceRange} handleData={priceRamgeFilterHandler} />;
  }, [priceRange]);

  const memoOptionalFilter = useMemo(() => {
    if (!attributes || Object.entries(attributes).length === 0) return;

    const optionalFiltersArray = Object.entries(attributes);
    return (
      <>
        {optionalFiltersArray.map((filter) => (
          <OptionalFilter key={Math.random()} filter={filter} handleData={optionalFilterHandler} />
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
