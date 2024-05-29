import { FC } from 'react';
import { FilterList } from 'widgets/FilterList';
import { NavMenu } from 'widgets/NavMenu';
import { ProductList } from 'widgets/ProductList';

export const Catalog: FC = () => {
  return (
    <>
      <NavMenu />
      <FilterList />
      <ProductList />
    </>
  );
};
