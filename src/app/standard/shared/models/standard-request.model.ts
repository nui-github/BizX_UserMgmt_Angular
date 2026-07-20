export class StandardPaginationRequest<T> {
  public criteria!: T | null;
  public pageNumber!: number;
  public pageSize!: number;
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