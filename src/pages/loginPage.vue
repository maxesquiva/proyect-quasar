<template>
  <div class="bg-light-green q-pt-xl  row justify-center items-center">
    <q-img src="src/statics/images/max.png" alt="Description of the image" placeholder-src="/path/to/placeholder.jpg"
      style="height: 170px; max-width: 300px" />
  </div>
  <q-page class="bg-light-green row justify-center   self-baseline">

    <div class="column">
      <div class="caja" style="background-color:black; text-align: center;">
        <h5 class="text-h5 text-white q-my-md ">Logueate compadre</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" method="POST" v-on:submit.prevent="store.submitForm()">
              <q-input square filled clearable v-model="store.email" type="email" label="email" />
              <q-input v-model="store.password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>

              <q-card-actions class="q-px-md">
                <q-btn unelevated color="light-green-7" type="submit" size="lg" class="full-width" label="Login" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <router-link to="/register">Not reigistered? Created an Account</router-link>
              </q-card-section>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { loginStore } from '../stores/loginStore';
import { ref } from 'vue'

export default {
  setup() {
    return {
      isPwd: ref(true),
    }
  },

  data() {
    const store = loginStore();
    return {
      token: '',
      store
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
