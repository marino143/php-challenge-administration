import { AppUser } from "@/models/app/user";

export interface AppUserVerification {
  id: number | null;
  user_id: number | null;
  token: string;
  created_at: string;
  updated_at: string;
  user: AppUser;
}

export class AppUserVerification implements AppUserVerification {
  public id: number | null;
  public user_id: number | null;
  public token: string;
  public created_at: string;
  public updated_at: string;
  public user: AppUser;

  public constructor() {
    this.id = null;
    this.user_id = null;
    this.token = "";
    this.created_at = "";
    this.updated_at = "";
    this.user = new AppUser();
  }
}
