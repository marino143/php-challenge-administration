<template>
  <div class="authentication-password-recovery-change-password">
    <section class="section-default">
      <el-container>
        <el-row :gutter="16" type="flex" justify="center">
          <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
            <div class="authentication-password-recovery-change-password__headline">
              <h1 class="authentication-password-recovery-change-password__headline-title">Change password</h1>
            </div>
            <div class="authentication-password-recovery-change-password__form">
              <div class="form--default">
                <el-form :model="formData" :rules="formDataRules" ref="formComponent" @submit.prevent="validateForm">
                  <el-form-item label="Password" prop="password">
                    <el-input type="password" placeholder="********" show-password v-model="formData.password"> </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" class="el-button--primary el-button--block" native-type="submit" :loading="isLoading" @click="validateForm()">Continue </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="authentication-password-recovery-change-password__navigation">
              <div class="authentication-password-recovery-change-password__navigation-return">
                <router-link :to="{ name: 'HomeIndex' }"> Back </router-link>
              </div>
              <div class="authentication-password-recovery-change-password__navigation-login">
                <router-link :to="{ name: 'AuthenticationLoginIndex' }"> Login </router-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </section>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Models
import { AuthenticationPasswordRecoveryChangePassword } from "@/models/authentication/password-recovery/change-password";
import { Response } from "@/models/response";

// Components
import { ElContainer, ElRow, ElCol, ElForm, ElFormItem, ElInput, ElButton } from "element-plus";

// Services
import { postRequest } from "@/services/api/request";

@Options({
  components: {
    ElContainer,
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
})
export default class AuthenticationPasswordRecoveryChangePasswordIndex extends Vue {
  isLoading = false;

  formData: AuthenticationPasswordRecoveryChangePassword = new AuthenticationPasswordRecoveryChangePassword();
  formDataRules = {
    verification_token: [
      {
        required: true,
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
      },
    ],
  };

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
    await postRequest({
      uri: "/authentication/password-recovery/change-password",
      formData: this.formData,
      isSuccessNotificationVisible: true,
      isErrorNotificationVisible: true,
    }).then((r: Response) => {
      if (r.status === "success") {
        this.$router.push({
          name: "AuthenticationLoginIndex",
        });
      }
    });
    this.isLoading = false;
  }

  setVerificationToken(): void {
    this.formData.token = this.$route.params.token;
  }

  created(): void {
    this.setVerificationToken();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/core/_variables.scss";
@import "~@/assets/scss/mixins/_breakpoints.scss";

.authentication-password-recovery-change-password {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    &-return {
      a {
        position: relative;
        display: inline-flex;
        font-size: 12px;
        font-weight: 700;
        color: $primary;
        text-transform: uppercase;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background-color: $primary;
          transition: $transition;
        }

        &:hover,
        &:active,
        &:focus,
        &:focus:active {
          &::after {
            width: 100%;
          }
        }
      }
    }

    &-login {
      a {
        position: relative;
        display: inline-flex;
        font-size: 12px;
        font-weight: 700;
        color: $primary;
        text-transform: uppercase;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background-color: $primary;
          transition: $transition;
        }

        &:hover,
        &:active,
        &:focus,
        &:focus:active {
          &::after {
            width: 100%;
          }
        }
      }
    }
  }

  .section-default {
    width: 100%;

    // Tablet
    @include media-breakpoint-down(lg) {
      width: calc(100% - 32px);
    }
  }
}
</style>
