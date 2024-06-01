import { FC, useEffect } from 'react';
import { FilterList } from 'widgets/FilterList';
import { LeftSideFilter } from 'widgets/LeftSideFilter';
import { NavMenu } from 'widgets/NavMenu';
import { ProductList } from 'widgets/ProductList';
import style from './Catalog.module.css';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getProductError } from 'entities/Product';
import { setNotificationMessage } from 'entities/NotificationTool';

export const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getProductError);

  useEffect(() => {
    if (!error) return;
    dispatch(
      setNotificationMessage({
        message: error,
        type: 'error',
      }),
    );
  }, [error]);

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
