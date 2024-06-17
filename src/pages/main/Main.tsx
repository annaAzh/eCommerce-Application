import { FC, useEffect } from 'react';
import './Main.css';
import { CategoryList } from 'widgets/CategoryList';
import { getAvailableCategories } from 'entities/Product';
import { getAccessToken } from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { PromoList } from 'widgets/PromoList';
import { OnSaleBlock } from 'widgets/OnSaleBlock';

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);

  useEffect(() => {
    if (!token) return;
    dispatch(getAvailableCategories(token));
  }, [token]);

  return (
    <div className="wrapper-main">
      <PromoList />
      <CategoryList />
      <OnSaleBlock />
    </div>
  );
};
