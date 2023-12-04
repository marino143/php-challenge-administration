export interface Authentication {
  token: string;
}

export class Authentication implements Authentication {
  public token: string;

  constructor() {
    this.token = "";
  }
}
