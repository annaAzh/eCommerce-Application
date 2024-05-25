import { Dropdown, MenuProps } from 'antd';
import { FC, useState } from 'react';
import { FilterLabel } from '../FilterLabel/FilterLabel';
import { CatalogUiProps } from '../../Catalog';

type SortBy = 'by default' | 'price asc' | 'price desc' | 'name.en-US asc' | 'name.en-US desc';

export const DefaultFilter: FC<CatalogUiProps> = ({ handleData }) => {
  const [sortBy, setSortBy] = useState<SortBy>('by default');

  const clickByDefault = () => {
    setSortBy('by default');
    handleData('');
  };
  const clickByPriceAsc = () => {
    const value = 'price asc';
    setSortBy(value);
    handleData(value);
  };
  const clickByPriceDesc = () => {
    const value = 'price desc';
    setSortBy(value);
    handleData(value);
  };
  const clickByNameAsc = () => {
    const value = 'name.en-US asc';
    setSortBy(value);
    handleData(value);
  };
  const clickByNameDesc = () => {
    const value = 'name.en-US desc';
    setSortBy(value);
    handleData(value);
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
    {
      key: '3',
      label: <div onClick={clickByNameAsc}>name asc</div>,
    },
    {
      key: '4',
      label: <div onClick={clickByNameDesc}>name desc</div>,
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <FilterLabel>{sortBy}</FilterLabel>
    </Dropdown>
  );
};
