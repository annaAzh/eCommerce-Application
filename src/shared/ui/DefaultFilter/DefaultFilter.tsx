import { Dropdown, MenuProps } from 'antd';
import { FC, useState } from 'react';
import { FilterLabel } from '../FilterLabel/FilterLabel';
import { SearchQueryProps } from 'shared/types';

type SortBy = 'by default' | 'price asc' | 'price desc' | 'name asc' | 'name desc';

interface DefaultFilterProps {
  handleData: (data: Pick<SearchQueryProps, 'sortField' | 'sortBy'> | undefined) => void;
}

export const DefaultFilter: FC<DefaultFilterProps> = ({ handleData }) => {
  const [sortBy, setSortBy] = useState<SortBy>('by default');

  const clickByDefault = () => {
    setSortBy('by default');
    handleData(undefined);
  };
  const clickByPriceAsc = () => {
    setSortBy('price asc');
    handleData({ sortBy: 'asc', sortField: 'price' });
  };
  const clickByPriceDesc = () => {
    setSortBy('price desc');
    handleData({ sortBy: 'desc', sortField: 'price' });
  };
  const clickByNameAsc = () => {
    setSortBy('name asc');
    handleData({ sortBy: 'asc', sortField: 'name.en-US' });
  };
  const clickByNameDesc = () => {
    setSortBy('name desc');
    handleData({ sortBy: 'desc', sortField: 'name.en-US' });
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
    <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: ['0'] }} placement="bottomLeft">
      <FilterLabel>{sortBy}</FilterLabel>
    </Dropdown>
  );
};
