import { SearchQueryProps } from 'shared/types';

type CatalogProps = {
  token: string;
  filter?: string[] | string;
  sort?: string;
  fuzzy?: boolean;
  search?: string;
};

export const createSortAndSearchQuery = (token: string, searchQuery?: SearchQueryProps): CatalogProps => {
  let sort: string | undefined = undefined;
  let filter: string[] = [];
  if (searchQuery?.sortBy && searchQuery.sortField) sort = `${searchQuery.sortField} ${searchQuery.sortBy}`;
  if (searchQuery?.optionalFilters) filter = [...filter, ...searchQuery.optionalFilters];
  if (searchQuery?.priceRange) filter = [...filter, searchQuery?.priceRange];
  if (searchQuery?.categoriesId) filter = [...filter, searchQuery.categoriesId];
  if (searchQuery?.search && searchQuery.fuzzy) {
    const { search, fuzzy } = searchQuery;
    return { token, sort, filter, search, fuzzy };
  }
  return { token, sort, filter };
};
