import { FC } from 'react';
import style from './LeftSideFilter.module.css';
import { addSearchCategory, getAllCategories, getSearchQuery } from 'entities/Product';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

export const LeftSideFilter: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getAllCategories);
  const categoriesId = useAppSelector(getSearchQuery)?.categoriesId;

  const onClick = (value: string) => {
    if (value === categoriesId) return;
    dispatch(addSearchCategory({ categoriesId: value }));
  };

  return (
    categories.length > 0 && (
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
    )
  );
};
