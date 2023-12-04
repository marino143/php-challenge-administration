// Router
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";

// Store
import store from "@/store/index";

const routerRedirectToDashboard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  next({ name: "AppAdministrationDashboardIndex" });
};

const routerGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.meta.protectedRoute && store.getters.getAuthentication.token !== "") {
    next();
  } else if (to.meta.protectedRoute && store.getters.getAuthentication.token === "") {
    next({ name: "HomeIndex" });
  } else if (!to.meta.protectedRoute && store.getters.getAuthentication.token !== "") {
    routerRedirectToDashboard(to, from, next);
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeIndex",
    meta: {
      protectedRoute: false,
    },
    component: () => import(/* webpackChunkName: "home-index" */ "../views/home/index.vue"),
    beforeEnter: routerGuard,
  },
  {
    path: "/authentication/login",
    name: "AuthenticationLoginIndex",
    meta: {
      protectedRoute: false,
    },
    component: () => import(/* webpackChunkName: "authentication-login-index" */ "../views/authentication/login/index.vue"),
    beforeEnter: routerGuard,
  },
  {
    path: "/authentication/password-recovery",
    name: "AuthenticationPasswordRecoveryIndex",
    meta: {
      protectedRoute: false,
    },
    component: () => import(/* webpackChunkName: "authentication-password-recovery-index" */ "../views/authentication/password-recovery/index.vue"),
    beforeEnter: routerGuard,
  },
  {
    path: "/authentication/password-recovery/change-password/:token",
    name: "AuthenticationPasswordRecoveryChangePasswordIndex",
    meta: {
      protectedRoute: false,
    },
    component: () => import(/* webpackChunkName: "authentication-password-recovery-change-password-index" */ "../views/authentication/password-recovery/change-password/index.vue"),
    beforeEnter: routerGuard,
  },
  {
    path: "/app/administration/dashboard",
    name: "AppAdministrationDashboardIndex",
    meta: {
      protectedRoute: true,
    },
    component: () => import(/* webpackChunkName: "app-administration-dashboard-index" */ "../views/app/administration/dashboard/index.vue"),
    beforeEnter: routerGuard,
  },
  {
    path: "/app/administration/users",
    name: "AppAdministrationUsersIndex",
    meta: {
      protectedRoute: true,
    },
    component: () => import(/* webpackChunkName: "app-administration-users-index" */ "../views/app/administration/users/index.vue"),
    beforeEnter: routerGuard,
  },
  {
    path: "/app/administration/tasks",
    name: "AppAdministrationTasksIndex",
    meta: {
      protectedRoute: true,
    },
    component: () => import(/* webpackChunkName: "app-administration-tasks-index" */ "../views/app/administration/tasks/index.vue"),
    beforeEnter: routerGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

export default router;
