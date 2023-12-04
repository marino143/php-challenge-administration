<template>
  <div class="app-administration-tasks-index">
    <el-container>
      <TasksList :request-tasks="requestTasks" :pagination-tasks="paginationTasks" :tasks="tasks" :users="users" @setView="setView" @setRequestTasksPage="setRequestTasksPage" />
    </el-container>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Models
import { AppTask } from "@/models/app/task";
import { AppUser } from "@/models/app/user";
import { Request } from "@/models/request";
import { Response } from "@/models/response";
import { Pagination } from "@/models/pagination";

// Components
import {
  ElContainer,
} from "element-plus";

import TasksList from "@/components/administration/tasks/list/index.vue";

// Services
import { getRequest } from "@/services/api/request";

@Options({
  components: {
    ElContainer,
    TasksList,
  },
})
export default class AppAdministrationTasksIndex extends Vue {
  requestTasks: Request = new Request();
  requestUsers: Request = new Request();
  paginationTasks: Pagination = new Pagination();

  tasks: Array<AppTask> = [];
  users: Array<AppUser> = [];

  async getTasks(): Promise<void> {
    await getRequest({
      uri: "/administration/task",
      formData: this.requestTasks,
      isProtected: true,
    }).then((r: Response) => {
      if (r.data) {
        this.tasks = r.data.tasks;
        this.paginationTasks = r.data.pagination;
      }
    });
  }

  async getUsers(): Promise<void> {
    await getRequest({
      uri: "/administration/user",
      formData: this.requestUsers,
      isProtected: true,
    }).then((r: Response) => {
      if (r.data) {
        this.users = r.data.users;
      }
    });
  }

  async getView(): Promise<void> {
    await this.getTasks();
    await this.getUsers();
  }

  setView(payload: { tasks: Array<AppTask>; paginationTasks: Pagination; }): void {
    const { tasks, paginationTasks } = payload;

    tasks ? (this.tasks = tasks) : null;
    paginationTasks ? (this.paginationTasks = paginationTasks) : null;
  }

  async setRequests(): Promise<void> {
    this.requestTasks = {
      searchField: null,
      searchQuery: null,
      with: JSON.stringify(["user"]),
      where: null,
      orderBy: "title",
      orderType: "asc",
      limit: null,
      paginate: "true",
      page: 1,
    };
    this.requestUsers = {
      searchField: null,
      searchQuery: null,
      with: null,
      where: null,
      orderBy: "name",
      orderType: "asc",
      limit: null,
      paginate: null,
      page: null,
    };
  }

  async setRequestTasksPage(page: number): Promise<void> {
    this.requestTasks.page = page;
    await this.getTasks();
  }

  async created(): Promise<void> {
    await this.setRequests();
    await this.getView();
  }
}
</script>
