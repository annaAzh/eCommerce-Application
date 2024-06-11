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
import { DefaultFilter, FilterLabel, OptionalFilter, PriceRangeFilter } from 'shared/ui';
import { SearchQueryProps } from 'shared/types';
import { createSortAndSearchQuery, getFormattedCategoryId } from 'shared/lib/dataConverters';
import { changeCurrentPage } from 'entities/Product/model/slices/productSlice';
import { DEFAULT_PAGE } from 'shared/consts/Products';

export const FilterList: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const priceRange = useAppSelector(getPriceRange);
  const attributes = useAppSelector(getAttributes);
  const searchQuery = useAppSelector(getSearchQuery);
  const [optionalFilters, setOptionalFilters] = useState<string[]>();
  const [clearKey, setClearKey] = useState<number>(0);

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

  const clearFilterHandler = () => {
    if (!token) return;
    dispatch(addSearchPriceRange(undefined));
    dispatch(addSearchSortBy(undefined));
    setOptionalFilters(undefined);
    dispatch(addSearchOptional({ optionalFilters: [] }));
    setClearKey((prevKey) => prevKey + 1);
    if (searchQuery?.categoriesId) {
      dispatch(getProductsForParsing({ token, filter: getFormattedCategoryId(searchQuery.categoriesId) }));
    } else {
      dispatch(getProductsForParsing({ token }));
    }
  };

  useEffect(() => {
    if (!optionalFilters) return;
    dispatch(addSearchOptional({ optionalFilters }));
  }, [optionalFilters]);

  useEffect(() => {
    if (!token || !searchQuery) return;
    dispatch(changeCurrentPage(DEFAULT_PAGE));
    dispatch(getAllProducts(createSortAndSearchQuery(token, searchQuery)));
  }, [
    searchQuery?.sortField,
    searchQuery?.sortBy,
    searchQuery?.optionalFilters,
    searchQuery?.priceRange,
    searchQuery?.search,
  ]);

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
    dispatch(getProductsForParsing({ token, filter: getFormattedCategoryId(searchQuery.categoriesId) }));
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

  const memoDefaultFilter = useMemo(() => {
    return <DefaultFilter key={clearKey} handleData={defaultFilterHandler} />;
  }, [clearKey]);

  return (
    <div className={styles.container}>
      {memoDefaultFilter}
      {memoPriceRangeFilter}
      {memoOptionalFilter}
      <FilterLabel onClick={clearFilterHandler}>clear filters</FilterLabel>
    </div>
  );
};
