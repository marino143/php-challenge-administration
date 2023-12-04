<template>
  <div class="header">
    <el-container>
      <div class="header__content">
        <div class="header__content-logo">
          Marino
        </div>
        <div class="header__content-user" v-click-outside="setIsUserMenuBoxVisible">
          <a href="#" class="header__content-user__name" @click.prevent="isUserMenuBoxVisible = true">
            {{ user.name }}
          </a>
          <div class="header__content-user__menu">
            <a href="#" class="header__content-user__menu-icon" @click.prevent="isUserMenuBoxVisible = true">
              <User />
            </a>
            <div class="header__content-user__menu-box" :class="{ 'header__content-user__menu-box--is-visible': isUserMenuBoxVisible }">
              <ul>
                <li>
                  <a href="#" @click.prevent="setLogout">Odjava</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Vendors
import vClickOutside from "click-outside-vue3";

// Store
import store from "@/store";

// Models
import { AppUser } from "@/models/app/user";

// Components
import { ElContainer } from "element-plus";
import { User } from "@element-plus/icons-vue";

// Services
import { postRequest } from "@/services/api/request";

@Options({
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    ElContainer,
    User
  }
})
export default class Header extends Vue {
  isUserMenuBoxVisible = false;

  get user(): AppUser {
    return store.getters.getUser;
  }

  setIsUserMenuBoxVisible(): void {
    this.isUserMenuBoxVisible = false;
  }

  async setLogout(): Promise<void> {
    await postRequest({
      uri: "/authentication/logout",
      isProtected: true,
      isSuccessNotificationVisible: true,
      isErrorNotificationVisible: true
    }).then(() => {
      store.dispatch("setLogout");

      this.$router.push({
        name: "HomeIndex"
      });
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/core/_variables.scss";
@import "~@/assets/scss/mixins/_breakpoints.scss";

.header {
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.15);
  z-index: 1020;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;

    &-logo {
      img {
        max-width: 128px;
      }
    }

    &-user {
      display: flex;
      align-items: center;

      &__name {
        font-size: 14px;
        font-weight: 600;
        color: $black;
      }

      &__menu {
        position: relative;

        &-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          background-color: $black;
          margin-left: 12px;

          svg {
            width: 16px;
            color: $white;
          }
        }

        &-box {
          position: absolute;
          top: 48px;
          right: 0;
          padding: 12px 24px;
          min-width: 240px;
          background-color: $white;
          box-shadow: 0 0 48px 24px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          display: none;

          &--is-visible {
            display: block;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;

            li {
              padding-top: 4px;
              padding-bottom: 4px;
              border-bottom: 1px solid $grey-50;

              &:first-child {
                padding-top: 0;
              }

              &:last-child {
                padding-bottom: 0;
                border-bottom: 0;
              }

              a {
                font-size: 14px;
                color: $black;

                &:hover,
                &:active,
                &:focus,
                &:focus:active {
                  color: $primary;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

