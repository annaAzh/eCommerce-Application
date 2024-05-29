import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import { addSearchText } from 'entities/Product';
import { getAccessToken } from 'entities/User';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import style from './UserSearch.module.css';

const { Search } = Input;

export const UserSearch: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (!token) return;
    if (info?.source === 'input') {
      dispatch(addSearchText({ search: value, fuzzy: true }));
    } else if (info?.source === 'clear') {
      dispatch(addSearchText(undefined));
    }
  };

  return (
    <Search
      className={style.searchCover}
      placeholder="seatch..."
      allowClear
      onSearch={onSearch}
      style={{ width: 150 }}
    />
  );
};
