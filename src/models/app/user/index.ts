export interface AppUser {
  id: number | null;
  name: string;
  email: string;
  password: string;
  role: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export class AppUser implements AppUser {
  public id: number | null;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public is_verified: boolean;
  public created_at: string;
  public updated_at: string;

  public constructor() {
    this.id = null;
    this.name = "";
    this.email = "";
    this.password = "";
    this.role = "";
    this.is_verified = false;
    this.created_at = "";
    this.updated_at = "";
  }
}
