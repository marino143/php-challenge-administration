// Vendors
import axios from "axios";

// Store
import store from "@/store";

// Router
import router from "@/router";

const Api = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.response.use(
  (r: any) => {
    return r;
  },
  async (e: any) => {
    if (e.response.status === 403 && store.getters.getAuthentication.token !== "") {
      await store.dispatch("setLogout");
      await router.push({ name: "HomeIndex" });
    }
    return Promise.reject(e);
  }
);

export default Api;
