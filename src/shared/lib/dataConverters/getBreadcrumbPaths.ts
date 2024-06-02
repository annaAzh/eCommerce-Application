import { FormattedCategories } from 'shared/types/productTypes';

export const getBreadcrumbPaths = (
  categories: FormattedCategories[],
  categoriesId: string,
): {
  title: string;
  path: string;
}[] => {
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

  return paths;
};
