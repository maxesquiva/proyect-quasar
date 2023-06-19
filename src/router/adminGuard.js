import { loginStore } from "../stores/loginStore";
import { LocalStorage } from "quasar";
import axios from "axios";

const authGuard = (to, from, next) => {
  console.log("aaa");
  const store = loginStore();
  const isLogin = store.isLoged;
  const isAdmin = store.isAdmin;
  console.log(isLogin + " booleano");

  if (isAdmin === true) {
    console.log(isLogin + " ha entrado solo estando logueado");
    // Verificar si el usuario ha iniciado sesión
    next();
  } else {
    next("/login");
  }
};
const adminGuard = (to, from, next) => {
  console.log("aaa");
  const store = loginStore();
  const isLogin = store.isLoged;
  const isAdmin = store.isAdmin;
  console.log(isLogin + " booleano");

  if (isLogin === true) {
    console.log(isLogin + " ha entrado solo estando logueado");
    // Verificar si el usuario ha iniciado sesión
    next();
  } else {
    next("/list");
  }
};

export default (authGuard, adminGuard);
