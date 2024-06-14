import cats from 'shared/assets/img/categories/cats.jpg';
import dogs from 'shared/assets/img/categories/dogs.jpg';
import birds from 'shared/assets/img/categories/birds.jpg';
import smalls from 'shared/assets/img/categories/small pets.jpg';
import style from './CategoryList.module.css';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/types';
import { addSearchCategory, getAllCategories } from 'entities/Product';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useEffect } from 'react';
import { HashLoader } from 'react-spinners';

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const categoryImages: string[] = [cats, dogs, smalls, birds];
  const categories = useAppSelector(getAllCategories);

  const handler = (categoriesId: string) => {
    console.log(categoriesId);
    dispatch(addSearchCategory({ categoriesId }));
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  // <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />

  return (
    <div className={style.wrapper}>
      <h2>Shop By Pet</h2>
      {categories.length > 0 ? (
        <div className={style.container}>
          {categoryImages.map((img, index) => (
            <Link key={index} to={`/${Paths.catalog}`} onClick={() => handler(categories[index].id)}>
              <img className={style.card} src={img} alt={img} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={style.container}>
          <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
        </div>
      )}
    </div>
  );
};
