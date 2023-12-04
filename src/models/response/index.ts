export interface Response {
  data: any;
  message: string;
  status: string;
}

export class Response implements Response {
  public data: any;
  public message: string;
  public status: string;

  constructor() {
    this.data = null;
    this.message = "";
    this.status = "";
  }
}
