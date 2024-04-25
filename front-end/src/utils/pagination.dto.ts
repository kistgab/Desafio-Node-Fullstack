export type Pagination<T> = {
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: T[];
  page: number;
  take: number;
  itemCount: number;
};
