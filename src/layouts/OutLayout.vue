
<template>
  <q-layout view="lHh LpR lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RegisterPage from '../pages/RegisterPage.vue';
// import RegisterPage from 'src/pages/RegisterPage.vue';
export default defineComponent({
  name: "RegisterLayout",
  // components: { RegisterPage }
});
</script>

<style scoped>
/* Agrega aquí los estilos que deseas utilizar para el diseño de la ruta /register */
</style>
<!-- export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script> -->
