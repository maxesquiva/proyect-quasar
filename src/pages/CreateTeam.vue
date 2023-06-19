<template>
  <div class="fit row wrap justify-center items-start content-start">

    <div class="" style="max-width: 80%; min-width: 60%;">
      <h6>Crear un equipo</h6>

      <form @submit.prevent="agregarUsuario">
        <label>Nombre del grupo</label><br>
        <q-input label="Nombre del grupo" v-model="groupName" />
        <label>Líder del grupo</label><br>
        <q-select v-model="groupLeader" :options="availableMemberOptions" label="Líder del grupo" option-label="label"
          option-value="value" />
        <label>Integrantes del grupo</label><br>
        <q-select v-model="selectedMember" :options="availableMemberOptions" label="Integrantes del grupo"
          option-label="label" option-value="value" /><br>
        <q-btn color="purple-4" label="Agregar" type="submit" class="q-mb-md"></q-btn>
      </form>

      <q-modal v-model="modalOpen" class="" content-css="max-width: 400px;">
        <q-card class="">
          <q-card-section class="my-card">
            <h5>Detalles del Grupo</h5>
            <ul>
              <strong>Nombre del Grupo:</strong>
              <li>
                {{ groupName }}
              </li>
              <strong>Líder del Grupo:</strong>
              <li>
                {{ getLeaderLabel(groupLeader.value) }}
              </li>
              <strong>Integrantes del Grupo:</strong>

              <li v-for="user in users" :key="user">{{ getUserName(user.value) }}
                <q-btn flat color="primary" label="X" @click="eliminarUsuario(user)" />
              </li>

            </ul>
            <q-btn color="purple-4" label="Crear" @click="createTeam(users)"></q-btn>
          </q-card-section>
        </q-card>
      </q-modal>
    </div>
  </div>
</template>

<script>
import { loginStore } from "../stores/loginStore";
import axios from 'axios';
import { Notify } from "quasar";
export default {

  data() {
    return {
      groupName: '',
      groupLeader: '',
      selectedMember: '',
      leaderOptions: [],
      memberOptions: [],
      users: [],
      modalOpen: false
    }
  },
  computed: {
    availableMemberOptions() {
      return this.memberOptions.filter(option => !this.users.find(user => user.value === option.value) && option.value !== this.groupLeader.value);
    }
  },
  methods: {
    agregarUsuario() {
      if (this.selectedMember) {
        this.users.push(this.selectedMember);
        this.selectedMember = '';
      }
    },
    mostrarDetallesGrupo() {
      this.modalOpen = true;
    },
    obtenerInformacionUsuario() {
      const token = loginStore().getToken;
      console.log(token)
      axios.get('http://localhost:8000/api/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data.data;
          this.leaderOptions = usuarios.map(user => ({
            label: user.name,
            value: user.id
          }));
          this.memberOptions = usuarios.map(user => ({
            label: user.name,
            value: user.id
          }));
          console.log(this.memberOptions);
          console.log(this.leaderOptions);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getUserName(users) {
      if (this.memberOptions) {
        const user = this.memberOptions.find(option => option.value === users);
        return user ? user.label : '';
      }

    },
    getLeaderLabel(value) {
      const leader = this.leaderOptions.find(option => option.value === value);
      return leader ? leader.label : '';
    },
    createTeam(users) {
      const userIds = users.map(user => ({ id: user.value, lider_id: 0 }));
      console.log(userIds + " id users")
      const token = loginStore().getToken;
      const leaderId = this.groupLeader.value;
      console.log('id del lider')
      console.log(leaderId)

      // Primero, crear el grupo
      const nameGroup = { name: this.groupName }
      console.log(this.groupName + "nombre grupo")
      axios.post('http://localhost:8000/api/teams', nameGroup, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const groupId = response.data.data.id;
          console.log(groupId + "  id del grupo")
          console.log("usuaarios")
          console.log(userIds)
          // Luego, insertar los participantes en el grupo
          const data = {
            team_id: groupId,
            users_id: [
              { id: leaderId, lider_id: 1 },
              ...userIds
            ]
          };
          axios.post('http://localhost:8000/api/teams/create', data, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              console.log(response.data);
              Notify.create("Equipo creado exitosamente");
            })
            .catch(error => {
              Notify.create("No se ha podido crear el equipo");
              console.log(error.response);
            });
        })
        .catch(error => {
          Notify.create("No se ha podido crear el grupo");
          console.log(error.response);
        });
    },
    eliminarUsuario(user) {
      const index = this.users.findIndex(u => u.value === user.value);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
  },
  created() {
    this.obtenerInformacionUsuario();
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
