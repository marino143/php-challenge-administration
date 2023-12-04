<template>
  <div class="home">
    <AuthenticationLoginIndex />
  </div>
</template>

<script lang="ts">
// Vue
import { Options, Vue } from "vue-class-component";

// Components
import AuthenticationLoginIndex from "@/views/authentication/login/index.vue";

@Options({
  components: {
    AuthenticationLoginIndex,
  },
})
export default class HomeIndex extends Vue {}
</script>
