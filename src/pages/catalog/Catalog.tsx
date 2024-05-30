import { FC } from 'react';
import { FilterList } from 'widgets/FilterList';
import { LeftSideFilter } from 'widgets/LeftSideFilter';
import { NavMenu } from 'widgets/NavMenu';
import { ProductList } from 'widgets/ProductList';
import style from './Catalog.module.css';

export const Catalog: FC = () => {
  return (
    <>
      <NavMenu />
      <div className={style.cover}>
        <LeftSideFilter />
        <div className={style.leftSide}>
          <FilterList />
          <ProductList />
        </div>
      </div>
    </>
  );
};
