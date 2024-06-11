import { Pagination } from 'antd';
import { getAllProducts } from 'entities/Product';
import { getCurrentPage, getSearchQuery, getTotalProducts } from 'entities/Product/model/selectors/productSelectors';
import { changeCurrentPage } from 'entities/Product/model/slices/productSlice';
import { getAccessToken } from 'entities/User';
import { FC, useEffect } from 'react';
import { CARD_ON_PAGE } from 'shared/consts';
import { DEFAULT_PAGE } from 'shared/consts/Products';
import { createSortAndSearchQuery } from 'shared/lib/dataConverters';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

const PaginationCatalog: FC = () => {
  const token = useAppSelector(getAccessToken);
  const total = useAppSelector(getTotalProducts);
  const searchQuery = useAppSelector(getSearchQuery);
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);

  useEffect(() => {
    if (!token || !searchQuery) return;
    if (searchQuery?.currentPage !== DEFAULT_PAGE) {
      dispatch(getAllProducts(createSortAndSearchQuery(token, searchQuery)));
    }
  }, [searchQuery?.currentPage]);

  const handlePagination = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  return (
    <Pagination
      defaultCurrent={DEFAULT_PAGE}
      current={currentPage || DEFAULT_PAGE}
      total={total}
      showSizeChanger={false}
      pageSize={CARD_ON_PAGE}
      style={{ marginBottom: '20px', marginTop: '20px' }}
      onChange={handlePagination}
    />
  );
};

export { PaginationCatalog };
