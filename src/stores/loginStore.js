// import { defineStore } from "pinia";

// export const loginStore = defineStore("login", {
//   state: () => ({
//     //     data:''
//     email: "",
//     password: "",
//   }),
//   actions: {
//     // const store = loginStore();
//     submitForm() {
//       const data = {
//         email: this.email,
//         password: this.password,
//       };
//       axios
//         .post(url + "/login/", data)
//         .then((response) => {
//           console.log(response.data);
//           // this.getTasks();
//           // this.show = false;
//           // window.location.reload()
//           //   this.$router.push('/homeMenu')
//           router.push({
//             name: "homeMenu",
//             params: { message: "Logged in successfully" },
//           });
//         })
//         .catch((error) => {
//           alert("Usuario o contraseña no valido");
//           console.log(error.response);
//         });
//     },
//   },
// });
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
const url = "http://localhost:8000/api";
import { Notify } from "quasar";

export const loginStore = defineStore("login", {
  data() {
    return {
      usuarios: [],
    };
  },
  created() {
    const user = this.obtenerInformacionUsuario();
  },
  state: () => ({
    email: "",
    password: "",
    token: null,
    user: null,
  }),
  persist: true,
  getters: {
    getToken(state) {
      console.log(state.token);
      return state.token;
    },
    isLoged() {
      console.log(this.getToken);
      console.log("depues por aqui");
      return Boolean(this.getToken);
    },
    isAdmin(state) {
      const token = state.token;
      console.log(token + "   obtener");
      axios
        .get(url + "/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const usuarios = response.data;
          console.log("usuarios");
          console.log(usuarios.isAdmin);
          return usuarios;
        })
        .then((usuarios) => {
          if (usuarios.isAdmin === 1) {
            console.log("paso por qui");
            return true;
          } else {
            this.router.push("/login");
            Notify.create("no tienes permisos de usuario");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.user);
    },
  },

  actions: {
    obtenerInformacionUsuario(token) {
      this.obtenerInformacionUsuario(usuarios.name);
      console.log(token + "   obtener");
      axios
        .get(url + "/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const usuarios = response.data.data;
          console.log(usuarios);
          this.user = user;
          return user;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitForm() {
      console.log(this.email, this.password);
      const data = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(url + "/login/", data)
        .then((response) => {
          this.token = response.data.data.token;
          this.router.push("/homePage");
          Notify.create("Bienvenido");
        })
        .catch((error) => {
          Notify.create("Usuario o contraseña no valido");
          console.log(error.response);
        });
    },
  },
});
