<template>
  <div class="fit row wrap justify-center items-start content-start">

    <div class="" style="max-width: 80%; min-width: 60%;">
      <q-btn color="purple-4" label="Borrar Grupo" @click="deleteTeam(Id, token)"></q-btn>
      <h6>Modifica el equipo: </h6>

      <form @submit.prevent="agregarUsuario">
        <label>Nombre del grupo</label><br>
        <q-input label="Nombre del grupo" v-model="usuarios.name" />
        <label>Líder del grupo</label><br>
        <q-select v-model="groupLeader" :options="availableMemberOptions" label="Líder del grupo" option-label="label"
          option-value="value" />
        <label>Integrantes del grupo</label><br>
        <q-select v-model="selectedMember" :options="availableMemberOptions" label="Integrantes del grupo"
          option-label="label" option-value="value" /><br>
        <q-btn color="purple-4" label="Agregar" type="submit" class="q-mb-md"></q-btn>
      </form>

      <q-modal v-model="modalOpen" content-css="max-width: 400px;">
        <q-card class="">
          <q-card-section class="my-card">
            <h5>Detalles del Grupo</h5>
            <ul>
              <strong>Nombre del Grupo:</strong>
              <li>
                {{ usuarios.name }}
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
            <q-btn color="purple-4" label="Modificar grupo" @click="createTeam(users, Id)"></q-btn>
          </q-card-section>
        </q-card>
      </q-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = "http://localhost:8000/api";
const url2 = "http://localhost:8000/storage/";
import { loginStore } from "../stores/loginStore";
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
export default {

  data() {
    return {
      groupName: '',
      groupLeader: '',
      selectedMember: '',
      leaderOptions: [],
      memberOptions: [],
      users: [],
      Id: null,
      modalOpen: false,
      usuarios: []
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
      const route = useRoute();
      const Id = route.params.id;
      console.log(Id)
      this.createTeam(this.users, Id);
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

    deleteTeam() {
      const token = loginStore().getToken;
      const Id = this.Id
      console.log('Id')
      console.log(Id)
      console.log(token)
      axios.delete(url + `/teams/deleteTeam/${Id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;
          console.log(usuarios);
          this.$q.notify('equipo borrado');
          this.$router.push("/listTeam");
          // this.usuarios = usuarios;
        })
        .catch(error => {
          console.error(error);
          this.$q.notify('Erro no se ha podido eliminar');
        });
    },
    getTeam(token, Id) {

      console.log(Id)

      console.log(token + "   obtener");
      axios.get(url + `/teams/show/${Id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;
          console.log(usuarios);
          this.usuarios = usuarios;


          const nombresUsuarios = usuarios.users.map(usuario => usuario.name);
          console.log(nombresUsuarios);
        })
        .catch(error => {
          console.error(error);
        });
    },


    createTeam(users) {
      const Id = this.Id
      console.log(" id del grupo ")
      console.log(Id)
      const userIds = users.map(user => ({ id: user.value, lider_id: 0 }));
      console.log(" id users")
      console.log(userIds)
      const token = loginStore().getToken;
      const leaderId = this.groupLeader.value;
      console.log('id del lider')
      console.log(leaderId)
      console.log(this.groupName + "nombre grupo")

      // Luego, insertar los participantes en el grupo
      const data = {
        name: this.usuarios.name,
        // team_id: groupId,
        user_id: [
          { id: leaderId, lider_id: 1 },
          ...userIds
        ]
      };
      console.log("data")
      console.log(data)
      axios.patch('http://localhost:8000/api/teams/modify/' + Id, data, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          console.log(response.data);
          Notify.create("Equipo creado exitosamente");

        })
        .catch(error => {
          Notify.create("No se ha podido crear el equipo");
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
    const route = useRoute();
    this.Id = route.params.id;
    const token = loginStore().getToken;

    this.getTeam(token, this.Id);
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
