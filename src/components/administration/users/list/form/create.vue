<template>
  <div class="form-create">
    <div class="form-create__action">
      <el-button class="el-button--primary el-button--small" @click.prevent="isDialogVisible = true">
        <Plus /> Add
      </el-button>
    </div>
    <el-dialog title="Add" v-model="isDialogVisible">
      <el-form :model="formData" :rules="formDataRules" ref="formComponent" @submit.prevent="validateForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input type="email" v-model="formData.email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="formData.password" show-password />
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <el-select v-model="formData.role" placeholder="Choose" filterable>
            <el-option label="Administrator" value="administrator" />
            <el-option label="Client" value="client" />
          </el-select>
        </el-form-item>
        <el-form-item label="Verification" prop="is_verified">
          <el-select v-model="formData.is_verified" placeholder="Choose" filterable>
            <el-option label="Yes" :value="true" />
            <el-option label="No" :value="false" />
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

  formData: AppUser = new AppUser();
  formDataRules = {
    name: [
      {
        required: true,
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        type: "email",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
      },
    ],
    role: [
      {
        required: true,
        trigger: "blur",
      },
    ],
    is_verified: [
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
    this.formData = new AppUser();
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
      uri: "/administration/user",
      formData: this.formData,
      isProtected: true,
      isSuccessNotificationVisible: true,
      isErrorNotificationVisible: true,
    }).then((r: Response) => {
      if (r.status === "success") {
        this.$emit("getUsers");
        this.isDialogVisible = false;
        this.resetFormData();
      }
    });
    this.isLoading = false;
  }
}
</script>
