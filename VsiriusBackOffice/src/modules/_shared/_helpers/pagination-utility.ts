export interface Pagination {
  totalCount: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  skip: number;
}
export interface PaginationEbay {
  totalCount: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  skip: number;
}

export interface PaginationEtsy {
  totalCount: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  skip: number;
}

export interface PaginationParam {
  pageNumber: number;
  pageSize: number;
}

export class PaginationResult<T> {
  result: T[];
  pagination: Pagination;
}
export class PaginationResultEbay<T> {
  result: T[];
  pagination: PaginationEbay;
}

export interface PaginationResult2<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  pageCount: number;
}