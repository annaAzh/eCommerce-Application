import {
  getSearchQuery,
  getAllCategories,
  addSearchCategory,
  clearSearchQuery,
  getAllProducts,
} from 'entities/Product';
import { getAccessToken } from 'entities/User';
import { FC, useMemo } from 'react';
import { getBreadcrumbPaths } from 'shared/lib/dataConverters';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks';
import { Breadcrumbs } from 'shared/ui';

export const CatalogBreadcrumb: FC = () => {
  const token = useAppSelector(getAccessToken);
  const categoriesId = useAppSelector(getSearchQuery)?.categoriesId;
  const categories = useAppSelector(getAllCategories);
  const dispatch = useAppDispatch();

  const handler = (id: string | undefined) => {
    if (!id) {
      dispatch(clearSearchQuery());
      if (token) dispatch(getAllProducts({ token }));
    } else {
      dispatch(addSearchCategory({ categoriesId: id }));
    }
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
