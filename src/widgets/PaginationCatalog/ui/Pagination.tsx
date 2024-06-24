import { Pagination } from 'antd';
import { getAllProducts } from 'entities/Product';
import { getSearchQuery, getTotalProducts } from 'entities/Product/model/selectors/productSelectors';
import { getAccessToken } from 'entities/User';
import { FC, useEffect, useState } from 'react';
import { CARD_ON_PAGE } from 'shared/consts';
import { DEFAULT_PAGE } from 'shared/consts/Products';
import { createSortAndSearchQuery } from 'shared/lib/dataConverters';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

const PaginationCatalog: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const total = useAppSelector(getTotalProducts);
  const searchQuery = useAppSelector(getSearchQuery);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);

  useEffect(() => {
    setCurrentPage(DEFAULT_PAGE);
  }, [searchQuery]);

  const handlePagination = (value: number) => {
    if (!token) return;
    dispatch(getAllProducts(createSortAndSearchQuery(token, searchQuery, value)));
    setCurrentPage(value);
  };

  return (
    <Pagination
      defaultCurrent={DEFAULT_PAGE}
      current={currentPage}
      total={total}
      showSizeChanger={false}
      pageSize={CARD_ON_PAGE}
      style={{ marginBottom: '20px', marginTop: '20px' }}
      onChange={handlePagination}
    />
  );
};

export { PaginationCatalog };
