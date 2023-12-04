export interface AuthenticationPasswordRecovery {
  email: string;
}

export class AuthenticationPasswordRecovery implements AuthenticationPasswordRecovery {
  public email: string;

  constructor() {
    this.email = "";
  }
}
