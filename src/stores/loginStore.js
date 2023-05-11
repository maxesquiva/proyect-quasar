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

export const loginStore = defineStore("login", {
  state: () => ({
    email: "",
    password: "",
    token: null,
  }),
  getters: {
    getToken(state) {
      console.log(state.token);
      return state.token;
    },
    isLoged() {
      console.log(this.getToken);
      return Boolean(this.getToken);
    },
  },

  actions: {
    submitForm() {
      console.log(this.email, this.password);
      const data = {
        email: this.email,
        password: this.password,
      };
      // const router = useRouter();
      axios
        .post(url + "/login/", data)
        .then((response) => {
          // console.log(response.data.data.token);

          // localStorage.setItem("token", response.data.data.token);
          this.token = response.data.data.token; // Set the token property
          // console.log(response.data.token);
          // localStorage.setItem("token", response.data.token); // Guardar el token en localStorage
          this.router.push("/homePage"); // Use the $router property to navigate to the homePage
        })
        .catch((error) => {
          alert("Usuario o contraseña no valido");
          console.log(error.response);
        });
    },
  },
});
