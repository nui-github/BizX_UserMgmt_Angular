export class PaginationRequest<T> {
  public criteria: T | undefined;
  public pageNumber: number | undefined;
  public pageSize: number | undefined;
  public sort?: SortModel;
}

export class SortModel {
  public name: string | undefined;
  public direction: DirectionModel | undefined; 
}

export enum DirectionModel {
  ASC = "ASC",
  DESC = "DESC"
}