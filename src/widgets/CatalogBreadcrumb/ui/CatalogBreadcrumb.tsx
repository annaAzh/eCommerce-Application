import { getSearchQuery, getAllCategories, addSearchCategory } from 'entities/Product';
import { FC, useMemo } from 'react';
import { getBreadcrumbPaths } from 'shared/lib/dataConverters';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks';
import { Breadcrumbs } from 'shared/ui';

export const CatalogBreadcrumb: FC = () => {
  const categoriesId = useAppSelector(getSearchQuery)?.categoriesId;
  const categories = useAppSelector(getAllCategories);
  const dispatch = useAppDispatch();

  const handler = (id: string | undefined) => {
    if (!id) {
      dispatch(addSearchCategory(undefined));
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
