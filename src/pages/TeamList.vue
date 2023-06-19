<template>
  <div class="q-pa-md ">
    <q-btn color="purple-4" class="q-mt-md q-mb-md" href="./team">
      <span class="mdi mdi-account-multiple-plus" style="font-size: 24px;"></span>
      Crear nuevo equipo
    </q-btn>

    <q-table flat bordered title="Lista de grupos" :rows="rows" :columns="columns" row-key="name" :filter="filter"
      hide-header>
      <template v-slot:body="props">
        <q-tr :props="props" @click.enter="onRowClick(props.row)" style="cursor: pointer;">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="lider" :props="props">
            <ul style="list-style-type: none; padding: 0;">
              <li v-for="user in props.row" :key="user.id">
                {{ user.name }}
              </li>
            </ul>
          </q-td>

          <q-td key="participants" :props="props">
            <ul style="list-style-type: none; padding: 0;">
              <li v-for="user in props.row.users" :key="user.id">
                <template v-if="user.pivot.lider_id === 0">
                  {{ user.name }}
                </template>
              </li>
            </ul>
          </q-td>
          <q-td key="telephone" :props="props">
          </q-td>
        </q-tr>

      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search"
          style="border-bottom: 1px solid #000;">
          <template v-slot:append>
            <q-icon name="search" style="cursor: pointer;" />
          </template>
        </q-input>
        <q-toggle v-model="showInactive" name="switch" color="primary" label="Mostrar inactivos"
          @click="onToggleInactive(showInactive)" />
      </template>

    </q-table>
  </div>
</template>

<script>
import axios from 'axios';
import { loginStore } from "../stores/loginStore";
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    format: val => `${val}`,
    sortable: true,

  },
  { name: 'name', align: 'center', label: 'Nombre grupo', field: 'name', sortable: true },
  { name: 'lider', label: 'lider', field: 'lider', sortable: true },
  { name: 'participants', label: 'Participantes', field: 'participants', sortable: true },
]

export default {
  data() {
    return {
      showInactive: false,
      filter: '',
    }
  },
  methods: {
    isLiderIdOne(users) {
      return users.some(user => user.pivot.lider_id === 1);
    }
  },
  setup() {

    const rows = ref([]);
    const router = useRouter();
    const onRowClick = (row) => {
      router.push(`/modifyTeam/${row.id}`)
    };

    onMounted(() => {
      obtenerInformacionUsuario();
    });

    const obtenerInformacionUsuario = () => {
      const token = loginStore().getToken;
      console.log(token + "   obtener");
      axios.get('http://localhost:8000/api/teams', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data;

          rows.value = usuarios;
          console.log(usuarios);

        })
        .catch(error => {
          console.error(error);
        });
    };

    return {
      onRowClick,
      columns,
      rows,
    };
  },
}
</script>
