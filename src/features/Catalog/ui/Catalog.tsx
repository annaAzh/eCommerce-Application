import { FC, useEffect, useMemo, useState } from 'react';
import styles from './Catalog.module.css';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { getAllProducts } from '../model/services/getAllProducts';
import { DefaultFilter } from './components/DefaultFilter/DefaultFilter';
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
  const [variantFilter, setVariantFilter] = useState<string[]>([]);
  const [priceRangeValue, setPriceRangeValue] = useState<string>();
  const [defaultFilterValue, setDefaultFilterValue] = useState<string>();
  const [categoriesFilterValue, setCategoriesFilterValue] = useState<string>();

  const optionalFilterHandler = (currentValue: string, prevValue?: string) => {
    if (prevValue) {
      if (currentValue) {
        setVariantFilter((prevVariantFilter) => [
          ...prevVariantFilter.filter((value) => value !== prevValue),
          currentValue,
        ]);
      } else {
        setVariantFilter((prevVariantFilter) => [...prevVariantFilter.filter((value) => value !== prevValue)]);
      }
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
    if (!token) return;
    dispatch(getProductsForParsing({ token, filter: categoriesFilterValue }));
    setVariantFilter([]);
    setPriceRangeValue(undefined);
    setDefaultFilterValue(undefined);
  }, [categoriesFilterValue]);

  useEffect(() => {
    if (!token) return;
    let filter: string[] = [...variantFilter];
    if (categoriesFilterValue) filter = [...filter, categoriesFilterValue];
    if (priceRangeValue) filter = [...filter, priceRangeValue];
    dispatch(getAllProducts({ token, sort: defaultFilterValue, filter }));
  }, [variantFilter, priceRangeValue, defaultFilterValue]);

  const memoNavMenu = useMemo(() => {
    return <NavMenu handleData={setCategoriesFilterValue} categories={categories} />;
  }, [categories]);

  const memoPriceRangeFilter = useMemo(() => {
    return <PriceRangeFilter minAndMax={priceRange} handleData={setPriceRangeValue} />;
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
        <DefaultFilter handleData={setDefaultFilterValue} />
        {memoPriceRangeFilter}
        {memoOptionalFilter}
      </div>
    </>
  );
};
