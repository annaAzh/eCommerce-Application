import { FC } from 'react';
import style from './NavMenu.module.css';
import { Dropdown, MenuProps } from 'antd';
import { FormattedCategories } from 'features/Catalog/model/types/catalogTypes';

interface NavMenuProps {
  handleData: (value: string) => void;
  categories: FormattedCategories[];
}

export const NavMenu: FC<NavMenuProps> = ({ handleData, categories }) => {
  const onClick = (value: string) => {
    handleData(`categories.id:"${value}"`);
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
    </div>
  );
};
