<template>
  <div class="authentication-login">
    <section class="section-default">
      <el-container>
        <el-row :gutter="16" type="flex" justify="center">
          <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
            <div class="authentication-login__headline">
              <h1 class="authentication-login__headline-title">Login</h1>
            </div>
            <div class="authentication-login__form">
              <div class="form--default">
                <el-form :model="formData" :rules="formDataRules" ref="formComponent" @submit.prevent="validateForm">
                  <el-form-item label="E-mail" prop="email">
                    <el-input type="email" placeholder="npr. john.doe@mail.com" v-model="formData.email"> </el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input type="password" placeholder="********" show-password v-model="formData.password"> </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" class="el-button--primary el-button--block" native-type="submit" :loading="isLoading" @click="validateForm()">Continue </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="authentication-login__navigation">
              <div class="authentication-login__navigation-forgotten-password">
                <router-link :to="{ name: 'AuthenticationPasswordRecoveryIndex' }">Forgotten password?</router-link>
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

// Store
import store from "@/store/index";

// Models
import { AuthenticationLogin } from "@/models/authentication/login";
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
export default class AuthenticationLoginIndex extends Vue {
  isLoading = false;

  formData: AuthenticationLogin = new AuthenticationLogin();
  formDataRules = {
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
      uri: "/authentication/login",
      formData: this.formData,
      isSuccessNotificationVisible: true,
      isErrorNotificationVisible: true,
    }).then((r: Response) => {
      if (r.status === "success") {
        store.dispatch("setAuthentication", r.data.authentication);
        store.dispatch("setUser", r.data.user);

        switch (store.getters.getUser.role) {
          case "administrator":
            this.$router.push({
              name: "AppAdministrationDashboardIndex",
            });
            break;
          default:
            store.dispatch("setLogout");
            this.$router.push({
              name: "HomeIndex",
            });
            break;
        }
      }
    });
    this.isLoading = false;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/core/_variables.scss";
@import "~@/assets/scss/mixins/_breakpoints.scss";

.authentication-login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;

    &-forgotten-password {
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
