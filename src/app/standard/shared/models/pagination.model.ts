export class Pagination {
  private static DEFAULT_PAGE = 1;
  private static DEFAULT_PAGESIZE = 10;
  private static DEFAULT_COLLECTIONSIZE = 0;

  public page: number;
  public pageSize: number;
  public collectionSize: number;

  constructor() {
    this.page = Pagination.DEFAULT_PAGE;
    this.pageSize = Pagination.DEFAULT_PAGESIZE;
    this.collectionSize = Pagination.DEFAULT_COLLECTIONSIZE;
  }
}