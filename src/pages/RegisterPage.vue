<template>
  <div class=" q-pt-xl  row justify-center " style="background:#8274C5;">
    <q-img src="src/statics/images/max.png" alt="Description of the image" placeholder-src="/path/to/placeholder.jpg"
      style="height: 170px; max-width: 300px" />
  </div>
  <q-page class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F); padding-bottom: 20%;">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registrate compadre</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-md q-pb-lg" method="POST" v-on:submit.prevent="store.registerForm()">
              <q-input square clearable v-model="store.email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="store.name" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="store.password" :type="isPwd ? 'password' : 'text'"
                hint="Password with toggle" label="Password">
                <template v-slot:prepend>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <q-input square clearable v-model="store.c_password" :type="isPwd ? 'password' : 'text'"
                hint="Password with toggle" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-card-actions class="q-px-sm q-pt-lg q-pb-sm">
                <q-btn unelevated size="lg" type="submit" color="purple-4" class="full-width text-white"
                  label="Registrate" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm " style="color:aliceblue">
                <router-link to="/login">Return to login</router-link>
              </q-card-section>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

import { registerStore } from '../stores/registerStore';
import { ref } from 'vue'

export default {
  name: 'RegisterPage',

  setup() {
    return {
      isPwd: ref(true),
    }
  },
  data() {
    const store = registerStore();

    return {
      store
    }
  }
}
</script>

<style></style>
