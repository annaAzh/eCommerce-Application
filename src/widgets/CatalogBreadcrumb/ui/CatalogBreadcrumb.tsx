import { getSearchQuery, getAllCategories, addSearchCategory } from 'entities/Product';
import { FC, useMemo } from 'react';
import { getFormattedCategoryId } from 'shared/lib/dataConverters';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks';
import { Breadcrumbs } from 'shared/ui';

export const CatalogBreadcrumb: FC = () => {
  const result = useAppSelector(getSearchQuery)?.categoriesId;
  const categoriesId = getFormattedCategoryId(result);
  const categories = useAppSelector(getAllCategories);
  const dispatch = useAppDispatch();

  const handler = (id: string | undefined) => {
    if (!id) {
      dispatch(addSearchCategory(undefined));
    } else {
      dispatch(addSearchCategory({ categoriesId: `categories.id:"${id}"` }));
    }
  };

  const memoBreadcrumbs = useMemo(() => {
    const paths: { title: string; path: string }[] = [];

    for (let i = 0; i < categories.length; i++) {
      const main = categories[i];

      if (main.id === categoriesId) {
        paths.push({ title: main.name.toLowerCase(), path: main.id });
        break;
      }

      for (let j = 0; j < main.subCategory.length; j++) {
        if (main.subCategory[j].id === categoriesId) {
          paths.push({ title: main.name.toLowerCase(), path: main.id });
          paths.push({ title: main.subCategory[j].name.toLowerCase(), path: main.subCategory[j].id });
          break;
        }
      }
    }

    return (
      <>
        {categoriesId ? (
          <Breadcrumbs useBasePaths={true} handler={handler} additionalPaths={paths} />
        ) : (
          <Breadcrumbs useBasePaths={true} handler={handler} />
        )}
      </>
    );
  }, [categoriesId]);

  return memoBreadcrumbs;
};
