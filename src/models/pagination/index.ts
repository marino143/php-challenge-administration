export interface Pagination {
  current_page: number;
  per_page: number;
  total_pages: number;
}

export class Pagination implements Pagination {
  public current_page: number;
  public per_page: number;
  public total_pages: number;

  constructor() {
    this.current_page = 1;
    this.per_page = 1;
    this.total_pages = 1;
  }
}
