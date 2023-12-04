export interface Statistic {
  users: number;
  tasks: number;
}

export class Statistic implements Statistic {
  public users: number;
  public tasks: number;

  constructor() {
    this.users = 0;
    this.tasks = 0;
  }
}
