import { FC } from 'react';
import { FilterList } from 'widgets/FilterList';
import { ProductList } from 'widgets/ProductList';

export const Catalog: FC = () => {
  return (
    <>
      <FilterList />
      <ProductList />
    </>
  );
};
