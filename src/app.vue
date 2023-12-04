<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <Header v-if="isLoggedIn" />
      <div class="wrapper">
        <Navigation v-if="isLoggedIn" />
        <router-view />
      </div>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Store
import store from "@/store";

// Components
import { ElConfigProvider, ElContainer } from "element-plus";
import Header from "@/components/header.vue";
import Navigation from "@/components/navigation.vue";

// Locale
import zhCnHR from "element-plus/dist/locale/hr.js";

@Options({
  components: {
    ElConfigProvider,
    ElContainer,
    Header,
    Navigation,
  },
})
export default class App extends Vue {
  locale = zhCnHR;

  get isLoggedIn(): boolean {
    return store.getters.getAuthentication.token !== "";
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/style.scss";
</style>
