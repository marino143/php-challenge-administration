import { AppUser } from "@/models/app/user";

export interface AppTask {
  id: number | null;
  user_id: number | null;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  user: AppUser;
}

export class AppTask implements AppTask {
  public id: number | null;
  public user_id: number | null;
  public title: string;
  public description: string | null;
  public created_at: string;
  public updated_at: string;
  public user: AppUser;

  public constructor() {
    this.id = null;
    this.user_id = null;
    this.title = "";
    this.description = "";
    this.created_at = "";
    this.updated_at = "";
    this.user = new AppUser();
  }
}
