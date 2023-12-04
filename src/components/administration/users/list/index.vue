<template>
  <div class="users-list">
    <div class="section-default">
      <div class="headline">
        <h1 class="headline__title">Users</h1>
        <div class="headline__action">
          <FormCreate @getUsers="getUsers" />
        </div>
      </div>
      <div class="content">
        <div class="content__box" v-if="isDataLoaded">
          <el-table :data="users" border scrollbar-always-on style="width: 100%" :max-height="'75vh'">
            <el-table-column label="Name" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="E-mail" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Role" min-width="200">
              <template #default="scope">
                {{ getUserRole(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column label="Verified" min-width="200">
              <template #default="scope">
                {{ getUserIsVerifiedStatus(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column width="115" fixed="right">
              <template #default="scope">
                <div class="el-table-column__action">
                  <el-button class="el-button--grey el-button--square" @click="setFormUpdate(scope.row)">
                    <Edit />
                  </el-button>
                  <el-button class="el-button--grey el-button--square" @click="setFormDelete(scope.row)">
                    <Delete />
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="content__message" v-if="isDataLoadedAndEmpty">No data...</div>
        <div class="content__loading" v-if="isLoading">
          <Loading />
        </div>
        <div class="content__pagination" v-if="isDataLoaded">
          <el-pagination background layout="prev, pager, next" :page-size="paginationUsers.per_page" :total="paginationUsers.total_pages" :current-page="paginationUsers.current_page" @current-change="setRequestUsersPage" />
        </div>
      </div>
      <FormUpdate ref="FormUpdate" :user="user" @getUsers="getUsers" />
      <FormDelete ref="FormDelete" :user="user" @getUsers="getUsers" />
    </div>
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
  ElTable,
  ElTableColumn,
  ElPagination,
  ElButton,
} from "element-plus";

import {
  Edit,
  Delete,
} from "@element-plus/icons-vue";

import FormCreate from "@/components/administration/users/list/form/create.vue";
import FormUpdate from "@/components/administration/users/list/form/update.vue";
import FormDelete from "@/components/administration/users/list/form/delete.vue";
import Loading from "@/components/loading.vue";

// Services
import { getRequest } from "@/services/api/request";

@Options({
  props: [
    "requestUsers",
    "paginationUsers",
    "users",
  ],
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    ElButton,
    Edit,
    Delete,
    FormCreate,
    FormUpdate,
    FormDelete,
    Loading,
  },
})
export default class UsersList extends Vue {
  isLoading = false;

  requestUsers: Request = new Request();
  paginationUsers: Pagination = new Pagination();
  users: Array<AppUser> = [];

  user: AppUser = new AppUser();

  $refs!: {
    FormUpdate: any;
    FormDelete: any;
  };

  get isDataLoaded(): boolean {
    return this.users.length > 0 && this.isLoading === false;
  }

  get isDataLoadedAndEmpty(): boolean {
    return this.users.length === 0 && this.isLoading === false;
  }

  getUserRole(user: AppUser): string {
    if (user.role === "administrator") {
      return "Administrator";
    }

    return "Client";
  }

  getUserIsVerifiedStatus(user: AppUser): string {
    return user.is_verified === true ? "Yes" : "No";
  }

  async getUsers(): Promise<void> {
    this.isLoading = true;
    await getRequest({
      uri: "/administration/user",
      formData: this.requestUsers,
      isProtected: true,
    }).then((r: Response) => {
      if (r.data) {
        this.$emit("setView", { users: r.data.users, paginationUsers: r.data.pagination });
        this.$emit("setRequestUsersPage", 1);
      }
    });
    this.isLoading = false;
  }

  setFormUpdate(user: AppUser): void {
    this.user = user;
    this.$refs.FormUpdate.isDialogVisible = true;
  }

  setFormDelete(user: AppUser): void {
    this.user = user;
    this.$refs.FormDelete.isDialogVisible = true;
  }

  setRequestUsersPage(page: number): void {
    this.$emit("setRequestUsersPage", page);
  }
}
</script>
