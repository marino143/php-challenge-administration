export interface Request {
  searchField: string | null;
  searchQuery: string | null;
  with: string | null;
  where: string | null;
  orderBy: string | null;
  orderType: string | null;
  limit: string | null;
  paginate: string | null;
  page: number | null;
}

export class Request implements Request {
  public searchField: string | null;
  public searchQuery: string | null;
  public with: string | null;
  public where: string | null;
  public orderBy: string | null;
  public orderType: string | null;
  public limit: string | null;
  public paginate: string | null;
  public page: number | null;

  constructor() {
    this.searchField = null;
    this.searchQuery = "";
    this.with = null;
    this.where = null;
    this.orderBy = null;
    this.orderType = null;
    this.limit = null;
    this.paginate = null;
    this.page = null;
  }
}
