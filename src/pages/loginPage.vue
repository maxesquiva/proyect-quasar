<template>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Registrate compadre</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" method="POST" v-on:submit.prevent="store.submitForm()">
              <q-input square filled clearable v-model="store.email" type="email" label="email" />
              <q-input square filled clearable v-model="store.password" type="password" label="password" />

              <q-card-actions class="q-px-md">
                <q-btn unelevated color="light-green-7" type="submit" size="lg" class="full-width" label="Login" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <router-link to="/register">Link a la página de about</router-link>
                <p class="text-grey-6">Not reigistered? Created an Account</p>
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
// import useQuasar from 'quasar/src/composables/use-quasar.js';
// import { ref } from 'vue'
export default {
  // name: 'Login',
  data() {
    const store = loginStore();
    // const email = ref('')
    // const password = ref('')
    return {
      email: '',
      password: '',
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













<!--
<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form method="POST" v-on:submit.prevent="store.submitForm()">
      <q-input type="email" v-model="store.email" label="Your name *" hint="Name and surname" />

      <q-input type="password" v-model="store.password" label="Your name *" hint="Name and surname" />


      <div>
        <q-btn label="Submit" type="submit" color="primary" icon="mdi-coffee-outline" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { loginStore } from '../stores/loginStore';
import useQuasar from 'quasar/src/composables/use-quasar.js';
import { ref } from 'vue'

export default {
  setup() {
    const store = loginStore();

    const $q = useQuasar()

    const email = ref('')
    const password = ref('')
    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    return {
      name,
      age,
      accept,
      store,

      submitForm() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset() {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script> -->
