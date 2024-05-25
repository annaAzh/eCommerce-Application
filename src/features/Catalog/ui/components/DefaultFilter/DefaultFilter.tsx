import { Dropdown, MenuProps } from 'antd';
import { FC, useState } from 'react';
import { FilterLabel } from '../FilterLabel/FilterLabel';
import { CatalogUiProps } from '../../Catalog';

type SortBy = 'by default' | 'price asc' | 'price desc';

export const DefaultFilter: FC<CatalogUiProps> = ({ handleData }) => {
  const [sortBy, setSortBy] = useState<SortBy>('by default');

  const clickByDefault = () => {
    setSortBy('by default');
    handleData('');
  };
  const clickByPriceAsc = () => {
    setSortBy('price asc');
    handleData('price asc');
  };
  const clickByPriceDesc = () => {
    setSortBy('price desc');
    handleData('price desc');
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: <div onClick={clickByDefault}>by default</div>,
    },
    {
      key: '1',
      label: <div onClick={clickByPriceAsc}>price asc</div>,
    },
    {
      key: '2',
      label: <div onClick={clickByPriceDesc}>price desc</div>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <FilterLabel>{sortBy}</FilterLabel>
    </Dropdown>
  );
};
