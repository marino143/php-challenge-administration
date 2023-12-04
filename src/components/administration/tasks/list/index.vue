<template>
  <div class="tasks-list">
    <div class="section-default">
      <div class="headline">
        <h1 class="headline__title">Tasks</h1>
        <div class="headline__action">
          <FormCreate :users="users" @getTasks="getTasks" />
        </div>
      </div>
      <div class="content">
        <div class="content__box" v-if="isDataLoaded">
          <el-table :data="tasks" border scrollbar-always-on style="width: 100%" :max-height="'75vh'">
            <el-table-column label="User" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.user.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Title" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Description" min-width="200">
              <template #default="scope">
                <span>{{ scope.row.description }}</span>
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
          <el-pagination background layout="prev, pager, next" :page-size="paginationTasks.per_page" :total="paginationTasks.total_pages" :current-page="paginationTasks.current_page" @current-change="setRequestTasksPage" />
        </div>
      </div>
      <FormUpdate ref="FormUpdate" :task="task" :users="users" @getTasks="getTasks" />
      <FormDelete ref="FormDelete" :task="task" @getTasks="getTasks" />
    </div>
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
  ElTable,
  ElTableColumn,
  ElPagination,
  ElButton,
} from "element-plus";

import {
  Edit,
  Delete,
} from "@element-plus/icons-vue";

import FormCreate from "@/components/administration/tasks/list/form/create.vue";
import FormUpdate from "@/components/administration/tasks/list/form/update.vue";
import FormDelete from "@/components/administration/tasks/list/form/delete.vue";
import Loading from "@/components/loading.vue";

// Services
import { getRequest } from "@/services/api/request";

@Options({
  props: [
    "requestTasks",
    "paginationTasks",
    "tasks",
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
export default class TasksList extends Vue {
  isLoading = false;

  requestTasks: Request = new Request();
  paginationTasks: Pagination = new Pagination();
  tasks: Array<AppTask> = [];
  users: Array<AppUser> = [];

  task: AppTask = new AppTask();

  $refs!: {
    FormUpdate: any;
    FormDelete: any;
  };

  get isDataLoaded(): boolean {
    return this.tasks.length > 0 && this.isLoading === false;
  }

  get isDataLoadedAndEmpty(): boolean {
    return this.tasks.length === 0 && this.isLoading === false;
  }

  async getTasks(): Promise<void> {
    this.isLoading = true;
    await getRequest({
      uri: "/administration/task",
      formData: this.requestTasks,
      isProtected: true,
    }).then((r: Response) => {
      if (r.data) {
        this.$emit("setView", { tasks: r.data.tasks, paginationTasks: r.data.pagination });
        this.$emit("setRequestTasksPage", 1);
      }
    });
    this.isLoading = false;
  }

  setFormUpdate(task: AppTask): void {
    this.task = task;
    this.$refs.FormUpdate.isDialogVisible = true;
  }

  setFormDelete(task: AppTask): void {
    this.task = task;
    this.$refs.FormDelete.isDialogVisible = true;
  }

  setRequestTasksPage(page: number): void {
    this.$emit("setRequestTasksPage", page);
  }
}
</script>
