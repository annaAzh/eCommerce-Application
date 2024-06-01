export const getFormattedCategoryId = (value: string | undefined) => {
  if (!value) return;
  const categoryIdIndex = 1;
  return value.split('"')[categoryIdIndex];
};
