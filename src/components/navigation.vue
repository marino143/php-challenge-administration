<template>
  <div class="navigation">
    <div class="navigation__menu">
      <el-menu @select="setRoute">
        <el-menu-item index="AppAdministrationDashboardIndex">
          <template #title>
            <span class="icon">
              <House />
            </span>
            <span class="label">Dashboard</span>
          </template>
        </el-menu-item>
        <el-menu-item index="AppAdministrationUsersIndex">
          <template #title>
            <span class="icon">
              <User />
            </span>
            <span class="label">Users</span>
          </template>
        </el-menu-item>
        <el-menu-item index="AppAdministrationTasksIndex">
          <template #title>
            <span class="icon">
              <MessageBox />
            </span>
            <span class="label">Tasks</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Components
import { ElMenu, ElMenuItemGroup, ElMenuItem, ElSubMenu } from "element-plus";

import { House, MessageBox, User } from "@element-plus/icons-vue";

@Options({
  components: {
    ElMenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElSubMenu,
    House,
    MessageBox,
    User,
  },
})
export default class Navigation extends Vue {
  setRoute(routeName: string): void {
    this.$router.push({
      name: routeName,
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/core/_variables.scss";
@import "~@/assets/scss/mixins/_breakpoints.scss";

.navigation {
  width: 200px;
  min-width: 200px;
  min-height: calc(100vh - 134px);
  padding: 24px;
  border-right: 1px solid $grey-60;

  &__menu {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }

    :deep(.el-menu) {
      background-color: transparent;
      border-right: 0;
    }

    .el-sub-menu {
      .icon {
        width: 20px;
        margin-right: 8px;
      }

      .label {
        font-size: 12px;
        font-weight: 600;
      }

      * {
        vertical-align: middle;
      }

      .el-menu {
        .el-menu-item {
          margin-left: 8px;
        }
      }
    }

    .el-menu-item {
      .icon {
        width: 20px;
        margin-right: 8px;
      }

      .label {
        font-size: 12px;
        font-weight: 600;
      }

      * {
        vertical-align: middle;
      }

      &.is-active {
        color: $primary;
      }
    }
  }
}
</style>
