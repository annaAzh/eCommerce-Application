import { FC } from 'react';
import style from './NavMenu.module.css';
import { Dropdown, MenuProps } from 'antd';
import { addSearchCategory, getAllCategories } from 'entities/Product';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { UserSearch } from 'features/UserSearch';

export const NavMenu: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getAllCategories);

  const onClick = (value: string) => {
    dispatch(addSearchCategory({ categoriesId: value }));
  };

  const result: MenuProps['items'][] = [];
  categories.forEach((category) => {
    const props = category.subCategory.map(({ name, id }) => {
      return {
        key: id,
        label: (
          <div className={style.dropItem} onClick={() => onClick(id)}>
            {name}
          </div>
        ),
      };
    });
    result.push(props as MenuProps['items']);
  });

  const items: MenuProps[] = result.map((item: MenuProps['items']) => {
    return { items: item };
  });

  return (
    <div className={style.nav}>
      {categories.map((category, index) => (
        <Dropdown key={index} menu={items[index]} placement="bottomLeft">
          <div className={style.navItem} onClick={() => onClick(category.id)}>
            {category.name}
          </div>
        </Dropdown>
      ))}
      <UserSearch />
    </div>
  );
};
