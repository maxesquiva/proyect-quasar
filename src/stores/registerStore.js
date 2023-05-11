import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
const url = "http://localhost:8000/api";

export const registerStore = defineStore("register", {
  state: () => ({
    // email: "",
    // name: "",
    // password: "",
    // c_password: "",
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    registerForm() {
      console.log(this.email, this.password);
      const data = {
        email: this.email,
        name: this.name,
        password: this.password,
        c_password: this.c_password,
      };
      const router = useRouter();
      axios
        .post(url + "/register/", data)
        .then((response) => {
          console.log(response.data);

          this.router.push("/login");
          alert(
            "Usuariocreado correctamente, ingrese su nuevo usuario para entrar"
          );
        })
        .catch((error) => {
          alert("Usuario o contraseña no valido");
          console.log(error.response);
        });
    },
  },
});
