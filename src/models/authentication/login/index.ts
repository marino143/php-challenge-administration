export interface AuthenticationLogin {
  email: string;
  password: string;
}

export class AuthenticationLogin implements AuthenticationLogin {
  public email: string;
  public password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
