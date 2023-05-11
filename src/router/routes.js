// import { authGuard } from "../router/authGuard";
import { loginStore } from "../stores/loginStore";
import authGuard from "./authGuard";

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
      { path: "login", component: () => import("pages/loginPage.vue") },
      {
        path: "homePage",
        component: () => import("pages/homePage.vue"),
        beforeEnter: authGuard,
      },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
    ],
    fallback: "/",
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
