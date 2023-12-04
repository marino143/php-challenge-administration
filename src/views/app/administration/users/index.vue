<template>
  <div class="app-administration-users-index">
    <el-container>
      <UsersList :request-users="requestUsers" :pagination-users="paginationUsers" :users="users" @setView="setView" @setRequestUsersPage="setRequestUsersPage" />
    </el-container>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Models
import { AppUser } from "@/models/app/user";
import { Request } from "@/models/request";
import { Response } from "@/models/response";
import { Pagination } from "@/models/pagination";

// Components
import {
  ElContainer,
} from "element-plus";

import UsersList from "@/components/administration/users/list/index.vue";

// Services
import { getRequest } from "@/services/api/request";

@Options({
  components: {
    ElContainer,
    UsersList,
  },
})
export default class AppAdministrationUsersIndex extends Vue {
  requestUsers: Request = new Request();
  paginationUsers: Pagination = new Pagination();

  users: Array<AppUser> = [];

  async getUsers(): Promise<void> {
    await getRequest({
      uri: "/administration/user",
      formData: this.requestUsers,
      isProtected: true,
    }).then((r: Response) => {
      if (r.data) {
        this.users = r.data.users;
        this.paginationUsers = r.data.pagination;
      }
    });
  }

  async getView(): Promise<void> {
    await this.getUsers();
  }

  setView(payload: { users: Array<AppUser>; paginationUsers: Pagination; }): void {
    const { users, paginationUsers } = payload;

    users ? (this.users = users) : null;
    paginationUsers ? (this.paginationUsers = paginationUsers) : null;
  }

  async setRequests(): Promise<void> {
    this.requestUsers = {
      searchField: null,
      searchQuery: null,
      with: null,
      where: null,
      orderBy: "name",
      orderType: "asc",
      limit: null,
      paginate: "true",
      page: 1,
    };
  }

  async setRequestUsersPage(page: number): Promise<void> {
    this.requestUsers.page = page;
    await this.getUsers();
  }

  async created(): Promise<void> {
    await this.setRequests();
    await this.getView();
  }
}
</script>
