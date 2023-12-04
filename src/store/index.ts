import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Models
import { Authentication } from "@/models/authentication";
import { AppUser } from "@/models/app/user";

// const ls = new SecureLS({
//   isCompression: false
// });

export default createStore({
  plugins: [
    createPersistedState({
      key: "MARINO",
      // storage: {
      //   // getItem: (key) => ls.get(key),
      //   // setItem: (key, value) => ls.set(key, value),
      //   // removeItem: (key) => ls.remove(key)
      // }
    }),
  ],
  state: {
    authentication: new Authentication(),
    user: new AppUser(),
  },
  getters: {
    getAuthentication(state): Authentication {
      return state.authentication;
    },
    getUser(state): AppUser {
      return state.user;
    },
  },
  mutations: {
    setAuthentication(state: any, data: Authentication): void {
      state.authentication = data;
    },
    setUser(state: any, data: AppUser): void {
      state.user = data;
    },
    setLogout(state: any): void {
      state.authentication = new Authentication();
      state.user = new AppUser();
    },
  },
  actions: {
    setAuthentication({ commit }, data: Authentication): void {
      commit("setAuthentication", data);
    },
    setUser({ commit }, data: AppUser): void {
      commit("setUser", data);
    },
    setLogout({ commit }): void {
      commit("setLogout");
    },
  },
  modules: {},
});
