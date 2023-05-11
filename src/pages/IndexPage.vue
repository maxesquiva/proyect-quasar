<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px">
  </q-page>

  <q-btn class="text-center q-pa-none">
    <router-link to="/register">Registrate</router-link>
    <!-- <p class="text-grey-6">Not reigistered? Created an Account</p> -->
  </q-btn>

  <q-btn class="text-center q-pa-none">
    <router-link to="/login">Logueate</router-link>
    <!-- <p class="text-grey-6">Not reigistered? Created an Account</p> -->
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
