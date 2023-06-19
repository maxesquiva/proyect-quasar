import { loginStore } from "../stores/loginStore";
import { LocalStorage } from "quasar";
import axios from "axios";

const authGuard = (to, from, next) => {
  console.log("aaa");
  const store = loginStore();
  const isLogin = store.isLoged;
  console.log(isLogin + " booleano");

  if (isLogin === true) {
    console.log(isLogin + " ha entrado solo estando logueado");
    // Verificar si el usuario ha iniciado sesión
    next();
  } else {
    next("/login");
  }
};
export default authGuard;
