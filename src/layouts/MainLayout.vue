<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background: #282828;" class=" glossy text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />


        <q-avatar class="text-center">
          <img :src="imagePath" v-show="imagePath">
          <div class="q-avatar__content text-h6 flex justify-center items-center text-white bg-purple" color="dark"
            v-show="!imagePath">
            {{ getInitials(usuarios.name, usuarios.lastName) }}
          </div>
        </q-avatar>

        <q-toolbar-title>
          Pagina de Manu
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered style="background: #bcbcbc63;">
      <q-list>
        <q-item-label header>
          Pagina de Manu
        </q-item-label>

        <div class="q-pa-md" style="max-width: 350px; ">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section>
                <router-link to="/homePage" class="mdi mdi-home" style="font-size: 18px;"> Home</router-link><br>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <router-link to="/user" class="mdi mdi-account-circle" style="font-size: 18px;">
                  Usuario</router-link><br>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-if="usuarios.isAdmin === 1">
              <q-item-section>
                <router-link to="/list" class="mdi mdi-text-account" style="font-size: 18px;"> Lista de
                  Usuarios</router-link><br>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-if="usuarios.isAdmin === 1">
              <q-item-section>
                <router-link to="/team" class="mdi mdi-account-multiple-plus" style="font-size: 18px;"> Crear un grupo de
                  trabajo</router-link><br>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-if="usuarios.isAdmin === 1">
              <q-item-section>
                <router-link to="/listTeam" class="mdi mdi-account-group" style="font-size: 18px;"> Lista de
                  grupos</router-link><br>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios';
const url = "http://localhost:8000/api";
const url2 = "http://localhost:8000/storage/";
import { loginStore } from "../stores/loginStore";


const linksList = [
  {
    title: 'Login',
    caption: 'quasar.dev',
    icon: 'school',
    route: { name: 'login' },
  },
  {
    title: 'Registrate',
    caption: 'github.com/quasarframework',
    icon: 'code',
    route: { name: 'register' }
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({

  name: 'MainLayout',


  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  created() {
    const token = loginStore().getToken;
    this.obtenerInformacionUsuario(token);
  },
  data() {
    return {
      usuarios: {},
      profileImage: null,
      imageUrl: '',
      imagePath: '',

    }
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
  }
})
</script>
