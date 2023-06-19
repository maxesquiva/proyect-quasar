<template>
  <div class="row justify-center content-start">
    <form method="PATCH" v-on:submit.prevent="updateUser(usuarios.id)" class="q-gutter-y-md column q-mt-xl q-mb-xl"
      style="overflow: auto; min-width: 300px; max-width: 300px;">

      <div>
        <!-- <img :src="imagePath" alt="ProfileImage" style="width:50%"> -->




        <q-avatar size="100px" class="rounded">
          <img :src="imagePath" v-show="imagePath">
          <div class="q-avatar__content text-h3 flex justify-center items-center text-white bg-purple"
            v-show="!imagePath">
            {{ getInitials(usuarios.name, usuarios.lastName) }}
          </div>
        </q-avatar>


      </div>


      <form method="PATCH" v-on:submit.prevent="uploadPhoto(usuarios.id)" class="q-gutter-y-md column q-mt-xl"
        style="overflow: auto; min-width: 300px; max-width: 300px;">

        <!-- <div class="input-group mt-2">
          <label class="font-bold">Seleccione una imagen</label>
          <input type="file" ref="fileupload" accept="image/*" class="form-control-file" @change="select_file"
            name="imagen" />
          <img :src="previewImage" class="img-thumbnail mt-2" v-if="this.fields.thumbnail" style="width:50%" />
        </div>

        <q-btn type="submit" :disabled="form_submitting" :value="form_submitting ? 'Saving comment...' : 'Save comment'"
          color="purple" label="Modificar avatar" /> -->

        <div class="">
          <div class="q-gutter-md row items-start" ref="fileupload" accept="image/*" @change="select_file" name="imagen">
            <q-input filled type="file" hint="Modificar avatar" />
            <img :src="previewImage" class="img-thumbnail mt-2" style="width:50%" />
          </div>
          <q-btn class="custom-button" type="submit" :disabled="form_submitting"
            :value="form_submitting ? 'Saving comment...' : 'Save comment'" color="purple" label="Modificar avatar" />
        </div>
      </form>
      <q-div clickable v-ripple>
        <q-item-section>Informacion del perfil:</q-item-section>
      </q-div>
      <q-input color="purple" filled v-model="usuarios.name" label="Nombre"></q-input>
      <q-input color="purple" filled v-model="usuarios.lastName" label="Apellidos"></q-input>
      <q-input color="purple" filled v-model="usuarios.telephone" label="Telefono"></q-input>
      <q-input color="purple" filled v-model="usuarios.dni" label="DNI"></q-input>
      <q-input color="purple" filled v-model="usuarios.email" label="Email"></q-input>

      <q-btn class="custom-button" type="submit" value="Modificar perfil" :url="uploadUrl" :headers="headers"
        :auto-upload="false" :multiple="false" :accept="['image/*']" @added="onFileAdded" color="purple"
        label="Modificar perfil" />

      <q-btn href="./change" color="purple" class="custom-button">cambiar contraseña</q-btn>

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

export default {
  setup() {

    return {
      fields: {
        thumbnail: null
      },
      text: ref('{{ usuarios.name }}'),
      model: ref(null)
    }
  },
  data() {
    return {
      usuarios: {},
      profileImage: null,
      imageUrl: '',
      imagePath: ''
    }
  },
  created() {

    const token = loginStore().getToken;
    this.obtenerInformacionUsuario(token);
  },

  mounted() {

  },
  methods: {
    getInitials(name, lastName) {
      if (!name && !lastName) {
        return "";
      }

      const initials = [];

      if (name) {
        const names = name.split(" ");
        initials.push(names[0].charAt(0).toUpperCase());
      }

      if (lastName) {
        const lastNames = lastName.split(" ");
        initials.push(lastNames[0].charAt(0).toUpperCase());
      }

      return initials.join("");
    },

    obtenerInformacionUsuario(token) {
      console.log(token + "   obtener");
      axios.get(url + '/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;
          console.log(usuarios);
          this.usuarios = usuarios;
          this.imageUrl = usuarios.profileImage;
          this.imagePath = this.imageUrl === null ? null : url2 + this.imageUrl;
        })
        .catch(error => {
          console.error(error);
        });
    },

    select_file(event) {
      this.fields.thumbnail = event.target.files[0];
      this.previewImage = URL.createObjectURL(this.fields.thumbnail);
    },


    uploadPhoto(id) {
      const token = loginStore().getToken;
      this.form_submitting = true;
      let fields = new FormData();
      for (let key in this.fields) {
        fields.append(key, this.fields[key]);
      }
      console.log(token + "   obtener");
      axios.post(url + '/avatar/' + id, fields, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;
          console.log(usuarios);
          this.usuarios = usuarios;
        })
        .catch(error => {
          console.error(error);
        });

    },


    updateUser(id) {

      const token = loginStore().getToken;
      const formData = new FormData();
      console.log(token)

      axios.patch(url + "/user/" + id, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        params: {
          name: this.usuarios.name,
          lastName: this.usuarios.lastName,
          telf: this.usuarios.telephone,
          dni: this.usuarios.dni,
          email: this.usuarios.email,
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
