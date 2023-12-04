export interface AuthenticationPasswordRecoveryChangePassword {
  token: string | string[];
  password: string;
}

export class AuthenticationPasswordRecoveryChangePassword implements AuthenticationPasswordRecoveryChangePassword {
  public token: string | string[];
  public password: string;

  constructor(token?: string | string[]) {
    this.token = token ?? "";
    this.password = "";
  }
}
