<template>
  <div class="row justify-center content-start">
    <form method="PATCH" v-on:submit.prevent="updateUser(usuarioId.id)" class="q-gutter-y-md column q-mt-xl q-mb-xl"
      style="overflow: auto; min-width: 300px; max-width: 300px;">

      <div>
        <q-avatar rounded size="100px">
          <img :src="imagePath" alt="ProfileImage">
        </q-avatar>
      </div>

      <form method="PATCH" v-on:submit.prevent="uploadPhoto(usuarioId.id)" class="q-gutter-y-md column q-mt-xl"
        style="overflow: auto; min-width: 300px; max-width: 300px;">

        <div class="">
          <div class="q-gutter-md row items-start" ref="fileupload" accept="image/*" @change="select_file" name="imagen">
            <q-input filled type="file" hint="Modificar avatar" />
            <img :src="previewImage" class="img-thumbnail mt-2" style="width:50%" />
          </div>
          <q-btn type="submit" :disabled="form_submitting" :value="form_submitting ? 'Saving comment...' : 'Save comment'"
            color="purple" label="Modificar avatar" class="custom-button" />
        </div>

      </form>
      <q-div clickable v-ripple>
        <q-item-section>Informacion del perfil:</q-item-section>
      </q-div>
      <q-input color="purple" filled v-model="usuarioId.name" label="Nombre"></q-input>
      <q-input color="purple" filled v-model="usuarioId.lastName" label="Apellidos"></q-input>
      <q-input color="purple" filled v-model="usuarioId.telephone" label="Telefono"></q-input>
      <q-input color="purple" filled v-model="usuarioId.dni" label="DNI"></q-input>
      <q-input color="purple" filled v-model="usuarioId.email" label="Email"></q-input>
      <q-toggle v-model="usuarioId.isAdmin" label="Admin" />
      <q-btn type="submit" value="Modificar perfil" :url="uploadUrl" :headers="headers" :auto-upload="false"
        :multiple="false" :accept="['image/*']" @added="onFileAdded" color="purple" label="Modificar perfil" />
      <q-btn href="./change" color="purple">cambiar contraseña</q-btn>
      <q-btn label="Eliminar usuario" color="purple" @click="confirm = true" size="md" />
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="person_remove" color="primary" text-color="white" />
            <span class="q-ml-sm">Estas seguro que desea borrar el usuario?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="confirmar" color="primary" v-close-popup @click="deleteUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </form>
  </div>
</template>

<script>
import axios from 'axios';
const url = "http://localhost:8000/api";
const url2 = "http://localhost:8000/storage/";
import { loginStore } from "../stores/loginStore";
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar'

export default {
  setup() {

    return {

      confirm: ref(false),
      fields: {
        thumbnail: null
      },
      text: ref('{{ usuarios.name }}'),
      model: ref(null),
    }
  },
  data() {
    return {
      usuarios: {},
      usuarioId: {},
      profileImage: null,
      imageUrl: '',
      imagePath: ''
    }
  },
  created() {
    const route = useRoute();
    const userId = route.params.id;
    console.log(userId);
    const token = loginStore().getToken;
    this.obtenerInformacionUsuario(token);
    this.getUserById(token, userId);

  },


  methods: {
    confirmDialog() {

      this.$q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // Acción al confirmar
      }).onCancel(() => {
        // Acción al cancelar
      }).onDismiss(() => {
        // Acción al cerrar el diálogo
      });
      console.log($q)
    },

    getUserById(token, userId) {

      console.log(userId);
      axios.get(url + `/usersId/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const user = response.data;
          this.usuarioId = response.data
          this.usuarioId.isAdmin = this.usuarioId.isAdmin === 1 ? true : false;

          console.log("aqui")
          console.log(user)

        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteUser() {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar al usuario?');
      if (!confirmDelete) {
        return;
      }
      const token = loginStore().getToken;
      console.log(token)
      console.log("id")
      const userId = this.usuarioId.id
      console.log(userId)


      axios.delete(url + "/deleteUser/" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,

        },

      })
        .then((response) => {
          console.log(response), console.log("eeeee");
          this.$q.notify('usuario borrado');
          this.$router.push("/list");
        })
        .catch((error) => {
          console.log(error.response);
          console.log("aaaaaa");
          this.$q.notify('usuario no actualizado, modifique algun campo')
        });
    },

    obtenerInformacionUsuario(token) {
      console.log(token + "   obtener");

      axios.get(url + '/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;
          console.log(usuarios);
          this.usuarios = usuarios;
          this.imageUrl = usuarios.profileImage;
          this.imagePath = url2 + this.imageUrl;
          console.log(usuarios.id + " aqui id")
        })
        .catch(error => {
          console.error(error);
        });
    },

    select_file(event) {
      this.fields.thumbnail = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.fields.thumbnail);
    },


    uploadPhoto(userId) {
      console.log(userId + " el id")
      const token = loginStore().getToken;
      this.form_submitting = true;
      // pass thumbnail
      let fields = new FormData();
      for (let key in this.fields) {
        fields.append(key, this.fields[key]);
      }
      console.log(token + "   obtener");
      axios.post(url + '/avatar/' + userId, fields, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const user = response.data;
          this.usuarioId = response.data
        })
        .catch(error => {
          console.error(error);
        });

    },


    updateUser(id) {

      const token = loginStore().getToken;
      const formData = new FormData();
      const isAdmin = this.usuarioId.isAdmin ? 1 : 0;

      console.log(token)
      console.log(this.usuarioId.isAdmin, " admin")

      axios.patch(url + "/user/" + id, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        params: {
          name: this.usuarioId.name,
          lastName: this.usuarioId.lastName,
          telf: this.usuarioId.telephone,
          dni: this.usuarioId.dni,
          email: this.usuarioId.email,
          isAdmin: isAdmin,
        }
      })
        .then((response) => {
          console.log(response), console.log("eeeee");
          this.$q.notify('usuario actualizado')
        })
        .catch((error) => {
          console.log(error.response);
          console.log("aaaaaa");
          this.$q.notify('usuario no actualizado, modifique algun campo')
        });
    },
    toFormData(obj) {
      // funcion que convierte a formData
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    }
  }
}
</script>

<style>
.custom-button {
  width: 300px;
}
</style>
