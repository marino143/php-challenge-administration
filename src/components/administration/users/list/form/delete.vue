<template>
  <div class="form-delete">
    <el-dialog title="Ukloni" class="el-dialog--confirmation" v-model="isDialogVisible">
      <div class="el-dialog__message">
        <p>Are you sure?</p>
      </div>
      <el-form class="el-form--default" :model="formData" ref="formComponent" @submit.prevent="validateForm">
        <el-form-item>
          <el-button type="primary" class="el-button--primary el-button--block" native-type="submit" :loading="isLoading">Jesam</el-button>
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
  ElButton,
} from "element-plus";

// Services
import { deleteRequest } from "@/services/api/request";

@Options({
  props: ["user"],
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElButton,
  },
})
export default class FormUpdate extends Vue {
  isLoading = false;
  isDialogVisible = false;

  user: AppUser = new AppUser();

  formData: AppUser = new AppUser();

  $refs!: {
    formComponent: HTMLFormElement;
  };

  validateForm(): void {
    this.$refs.formComponent.validate((response: any) => {
      if (response) {
        this.submitForm();
      }
    });
  }

  async submitForm(): Promise<void> {
    this.isLoading = true;
    await deleteRequest({
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

  setFormData(): void {
    this.formData = this.user;
  }

  resetFormData(): void {
    this.formData = new AppUser();
  }

  updated(): void {
    this.setFormData();
  }
}
</script>
