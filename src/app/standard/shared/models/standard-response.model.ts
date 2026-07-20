export interface StandardResponse<T> {
  code: string;
  status: string;
  message: string;
  data: T;
}

export enum StandardResponseStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error"
}

export interface IPagination<T> {
  data?: T[],
  row: number;
}

export interface IPaginationResponse<T> {
  result?: T[];
  totalRecords: number;
}

export interface IPage<T> {
  content: T[];
  number: number;
  totalPages: number;
  totalElements: number;
}