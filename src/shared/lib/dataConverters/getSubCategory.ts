import { FormattedCategories } from 'shared/types/productTypes';

export const getSubCategory = (
  categories: FormattedCategories[],
  firstId?: string,
  secondId?: string,
): string | undefined => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === secondId) {
      return firstId;
    } else if (categories[i].id === firstId && secondId) {
      return secondId;
    }
    const sub = categories[i].subCategory;
    for (let j = 0; j < sub.length; j++) {
      if (sub[j].id === firstId) {
        return firstId;
      } else if (sub[j].id === secondId) {
        return secondId;
      }
    }
  }
  return undefined;
};
