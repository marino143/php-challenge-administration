<template>
  <div class="form-create">
    <div class="form-create__action">
      <el-button class="el-button--primary el-button--small" @click.prevent="isDialogVisible = true">
        <Plus /> Add
      </el-button>
    </div>
    <el-dialog title="Add" v-model="isDialogVisible">
      <el-form :model="formData" :rules="formDataRules" ref="formComponent" @submit.prevent="validateForm">
        <el-form-item label="Title" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="User" prop="user_id">
          <el-select v-model="formData.user_id" placeholder="Choose" filterable>
            <el-option :label="user.name" :value="user.id" v-for="user in users" :key="user.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-button--primary el-button--block" native-type="submit" :loading="isLoading">Add</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Models
import { AppTask } from "@/models/app/task";
import { AppUser } from "@/models/app/user";
import { Response } from "@/models/response";

// Components
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
} from "element-plus";

import {
  Plus,
} from "@element-plus/icons-vue";

// Services
import { postRequest } from "@/services/api/request";

@Options({
  props: [
    "users",
  ],
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
    Plus,
  },
})
export default class FormCreate extends Vue {
  isLoading = false;
  isDialogVisible = false;

  users: Array<AppUser> = [];

  formData: AppTask = new AppTask();
  formDataRules = {
    user_id: [
      {
        required: true,
        trigger: "blur",
      },
    ],
    title: [
      {
        required: true,
        trigger: "blur",
      },
    ],
    description: [
      {
        required: true,
        trigger: "blur",
      },
    ],
  };

  $refs!: {
    formComponent: HTMLFormElement;
  };

  resetFormData(): void {
    this.formData = new AppTask();
  }

  validateForm(): void {
    this.$refs.formComponent.validate((response: any) => {
      if (response) {
        this.submitForm();
      }
    });
  }

  async submitForm(): Promise<void> {
    this.isLoading = true;
    await postRequest({
      uri: "/administration/task",
      formData: this.formData,
      isProtected: true,
      isSuccessNotificationVisible: true,
      isErrorNotificationVisible: true,
    }).then((r: Response) => {
      if (r.status === "success") {
        this.$emit("getTasks");
        this.isDialogVisible = false;
        this.resetFormData();
      }
    });
    this.isLoading = false;
  }
}
</script>
