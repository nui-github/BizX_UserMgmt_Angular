export class StandardPagination {
  private static DEFAULT_PAGE = 1;
  private static DEFAULT_PAGESIZE = 10;
  private static DEFAULT_COLLECTIONSIZE = 0;

  public page: number;
  public pageSize: number;
  public collectionSize: number;

  constructor() {
    this.page = StandardPagination.DEFAULT_PAGE;
    this.pageSize = StandardPagination.DEFAULT_PAGESIZE;
    this.collectionSize = StandardPagination.DEFAULT_COLLECTIONSIZE;
  }
}


export class i18nPagination{
  public previousText: string = "components.pagination.previous";
  public nextText: string = "components.pagination.next";
  public firstText: string = "components.pagination.first";
  public lastText: string = "components.pagination.last";

}
