export type RequestPagination<T> = {
  page: number;
  take: number;
  filters?: T;
};

export class ResponsePagination<T> {
  readonly pageCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;

  constructor(
    readonly data: T[],
    readonly page: number,
    readonly take: number,
    readonly itemCount: number,
  ) {
    this.pageCount = Math.ceil(itemCount / take);
    this.hasNextPage = page < this.pageCount;
    this.hasPreviousPage = page > 1;
  }
}
