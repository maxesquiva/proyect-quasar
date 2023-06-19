import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
const url = "http://localhost:8000/api";
import { Notify } from "quasar";

export const registerStore = defineStore("register", {
  state: () => ({}),

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
          Notify.create("Usuario registrado correctamente, inicie sesion");
        })
        .catch((error) => {
          Notify.create("email no valido o ya existente");
          console.log(error.response);
        });
    },
  },
});
