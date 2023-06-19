import { loginStore } from "../stores/loginStore";
import authGuard from "./authGuard";
import adminGuard from "./adminGuard";

const registerRoute = {
  path: "/register",
  component: () => import("pages/RegisterPage.vue"),
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        beforeEnter: authGuard,
      },

      {
        path: "homePage",
        component: () => import("pages/homePage.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "user",
        component: () => import("pages/UserInfo.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "/change",
        component: () => import("pages/changePassword.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "/list",
        component: () => import("pages/ListaUsuarios.vue"),
        beforeEnter: adminGuard,
      },
      {
        path: "/listTeam",
        component: () => import("pages/TeamList.vue"),
        beforeEnter: adminGuard,
      },
      {
        path: "/modifyTeam/:id",
        component: () => import("pages/ModifyTeams.vue"),
        beforeEnter: adminGuard,
      },
      {
        path: "/modUser/:id",
        component: () => import("pages/ModifyUser.vue"),
        beforeEnter: adminGuard,
        authGuard,
      },
      {
        path: "/team",
        component: () => import("pages/CreateTeam.vue"),
        beforeEnter: adminGuard,
        authGuard,
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/OutLayout.vue"),
    children: [
      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "login",
        component: () => import("pages/loginPage.vue"),
      },
    ],
  },

  { fallback: "/" },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
