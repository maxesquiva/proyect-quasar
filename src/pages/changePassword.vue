<template>
  <!-- <div>
    <h1>Cambiar contraseña</h1>
    <form @submit.prevent="updatePassword" method="POST">
      <q-input color="purple" filled v-model="usuarios.name" label="Nombre"></q-input>
      <div>
        <label for="current_password">Contraseña actual:</label>
        <input type="password" id="current_password" v-model="currentPassword">
      </div>
      <div>
        <label for="new_password">Nueva contraseña:</label>
        <input type="password" id="new_password" v-model="newPassword">
      </div>
      <div>
        <label for="confirm_password">Confirmar contraseña:</label>
        <input type="password" id="confirm_password" v-model="confirmPassword">
      </div>
      <button type="submit">Actualizar contraseña</button>
    </form>
  </div> -->

  <div class="row justify-center content-start">
    <form method="POST" v-on:submit.prevent="updatePassword" class="q-gutter-y-md column q-mt-xl"
      style="overflow: auto; min-width: 300px; max-width: 300px;">

      <!-- <q-div clickable v-ripple>
        <q-item-section>Cambiar contraseña:</q-item-section>
      </q-div>
      <q-input color="purple" filled type="password" id="current_password" v-model="currentPassword"
        label="Contraseña actual">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input color="purple" filled type="password" id="new_password" v-model="newPassword" label="Nueva contraseña">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input color="purple" filled type="password" id="confirm_password" v-model="confirmPassword"
        label="confirmar contraseña">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input> -->


      <q-div clickable v-ripple>
        <q-item-section>Cambiar la contraseña:</q-item-section>
      </q-div>

      <q-input color="purple" square clearable v-model="currentPassword" filled :type="isPwd ? 'password' : 'text'"
        hint="Contraseña actual" label="Password">
        <template v-slot:prepend>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <q-input color="purple" square clearable v-model="newPassword" filled :type="isPwd ? 'password' : 'text'"
        hint="Nueva contraseña" label="Password">
        <template v-slot:prepend>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <q-input color="purple" square clearable v-model="confirmPassword" filled :type="isPwd ? 'password' : 'text'"
        hint="confirmar contraseña" label="Password">
        <template v-slot:prepend>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <p v-if="newPassword !== confirmPassword" style="color: red;">Las contraseñas no coinciden.</p>

      <q-btn type="submit" value="Modificar perfil" :url="uploadUrl" :headers="headers" :auto-upload="false"
        :multiple="false" :accept="['image/*']" @added="onFileAdded" color="purple" label="Modificar contraseña" />
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const url = "http://localhost:8000/api";
import { loginStore } from "../stores/loginStore"
import { ref } from 'vue'

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      usuarios: [],
    };
  },
  setup() {
    return {
      isPwd: ref(true),
    }
  },
  created() {
    const id = this.id;
    const token = loginStore().getToken;
    this.obtenerInformacionUsuario(token);
    // updatePassword(id)
  },
  methods: {
    obtenerInformacionUsuario(token) {
      console.log(token + "   obtener");
      axios.get(url + '/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;
          this.usuarios = usuarios;
          console.log(usuarios);
        })
        .catch(error => {
          console.error(error);
        });
    },
    updatePassword() {
      const id = this.usuarios.id;
      const token = loginStore().getToken;
      console.log(token + 'token')
      console.log(id)
      console.log(this.currentPassword);
      if (this.newPassword === this.confirmPassword) {
        axios.post(url + "/change/" + id, {
          password: this.currentPassword,
          new_password: this.newPassword,
          c_password: this.confirmPassword,
        }, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            console.log(response.data);
            this.$q.notify('contraseña modificada correctamente');
            // Mostrar un mensaje de éxito
          })
          .catch(error => {
            this.$q.notify('No se ha podido modificar, Asegurese que ha ingresado bien la contraseña');
            console.log(error.response.data);
            // Mostrar un mensaje de error
          });
      } else {
        this.$q.notify('Las contraseñas nuevas no coinciden');
      }

    },
  },
};
</script>
