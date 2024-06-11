import { getSearchQuery, getAllCategories, addSearchCategory, clearSearchQuery } from 'entities/Product';
import { changeCurrentPage } from 'entities/Product/model/slices/productSlice';
import { FC, useMemo } from 'react';
import { DEFAULT_PAGE } from 'shared/consts';
import { getBreadcrumbPaths } from 'shared/lib/dataConverters';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks';
import { Breadcrumbs } from 'shared/ui';

export const CatalogBreadcrumb: FC = () => {
  const categoriesId = useAppSelector(getSearchQuery)?.categoriesId;
  const categories = useAppSelector(getAllCategories);
  const dispatch = useAppDispatch();

  const handler = (id: string | undefined) => {
    if (!id) {
      dispatch(clearSearchQuery());
    } else {
      dispatch(addSearchCategory({ categoriesId: id }));
    }
    dispatch(changeCurrentPage(DEFAULT_PAGE));
  };

  const memoBreadcrumbs = useMemo(() => {
    return (
      <>
        {categoriesId ? (
          <Breadcrumbs
            useBasePaths={true}
            handler={handler}
            additionalPaths={getBreadcrumbPaths(categories, categoriesId)}
          />
        ) : (
          <Breadcrumbs useBasePaths={true} handler={handler} />
        )}
      </>
    );
  }, [categoriesId]);

  return memoBreadcrumbs;
};
