import { FC } from 'react';
import './Main.css';
import { CategoryList } from 'widgets/CategoryList';

export const Main: FC = () => {
  return (
    <div className="wrapper-main">
      <CategoryList />
    </div>
  );
};
