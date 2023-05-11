import { loginStore } from "../stores/loginStore";
import { LocalStorage } from "quasar";
import axios from "axios";

const authGuard = (to, from, next) => {
  console.log("aaa");
  const store = loginStore();
  const isLogin = store.isLoged;
  // const token = LocalStorage.getItem("token");
  console.log(isLogin + " booleano");
  // if (isLogin) {
  //   // Agregar el token a la cabecera de autenticación
  //   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  // }
  // const isLogin = store.getters.isLogin; // Obtener el valor del getter isLogin

  if (isLogin === true) {
    console.log(isLogin + "ha entrado solo estando logueado");
    // Verificar si el usuario ha iniciado sesión
    next();
  } else {
    next("/login");
  }
};

export default authGuard;
