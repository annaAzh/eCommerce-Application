import { FC } from 'react';
import style from './LeftSideFilter.module.css';
import { addSearchCategory, getAllCategories, getSearchQuery } from 'entities/Product';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

export const LeftSideFilter: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getAllCategories);
  const result = useAppSelector(getSearchQuery)?.categoriesId;
  const categoriesId = result?.split('"')[1];

  const onClick = (value: string) => {
    dispatch(addSearchCategory({ categoriesId: `categories.id:"${value}"` }));
  };

  return (
    <div className={style.cover}>
      {categories.map(({ id, name, subCategory }) => (
        <div key={id}>
          <div
            className={categoriesId === id ? `${style.active} ${style.field}` : `${style.field}`}
            onClick={() => onClick(id)}
          >
            {name}
          </div>
          <div className={style.subCover}>
            {subCategory.map((category) => (
              <div
                key={category.id}
                className={categoriesId === category.id ? `${style.active} ${style.field}` : `${style.field}`}
                onClick={() => onClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
