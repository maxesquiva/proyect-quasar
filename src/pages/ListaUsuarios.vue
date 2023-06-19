<template>
  <div class="q-pa-md">
    <q-table flat bordered title="Lista de usuarios" :rows="rows" :columns="columns" row-key="name" :filter="filter">
      <template v-slot:body="props">
        <q-tr :props="props" @click.enter="onRowClick(props.row)" style="cursor: pointer;">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="lastName" :props="props">
            {{ props.row.lastName }}
          </q-td>
          <q-td key="telephone" :props="props">
            {{ props.row.telephone }}
          </q-td>
          <q-td key="dni" :props="props">
            {{ props.row.dni }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="Rol" :props="props">
            {{ props.row.isAdmin === 1 ? 'Admin' : props.row.isAdmin === 0 ? 'Usuario' : props.row.isAdmin }}
          </q-td>
          <q-td key="Estado" :props="props" v-show="showInactive">
            {{ props.row.deleted_at === null ? '✅' : '❌' }}
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
  { name: 'name', align: 'center', label: 'Nombre', field: 'name', sortable: true },
  { name: 'lastName', label: 'Apellidos', field: 'lastName', sortable: true },
  { name: 'telephone', label: 'Teléfono', field: 'telephone' },
  { name: 'dni', label: 'DNI', field: 'dni' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'Rol', label: 'Rol', field: 'Rol' },
  { name: 'Estado', label: '', field: 'deleted_at' },
]

export default {
  data() {
    return {
      showInactive: false,
      filter: '',
    }
  },
  setup() {

    const rows = ref([]);
    const router = useRouter();
    const onRowClick = (row) => {
      router.push(`/modUser/${row.id}`)
    };

    onMounted(() => {
      obtenerInformacionUsuario();
    });

    const obtenerInformacionUsuario = () => {
      const token = loginStore().getToken;
      console.log(token + "   obtener");
      axios.get('http://localhost:8000/api/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const usuarios = response.data.data;
          console.log(usuarios);
          rows.value = usuarios;

        })
        .catch(error => {
          console.error(error);
        });
    };
    const infoUserDeleted = () => {
      console.log('Mostrar inactivos:');
      const token = loginStore().getToken;
      console.log(token + "   obtener");
      axios
        .get('http://localhost:8000/api/usersDeleted', {
          headers: { Authorization: `Bearer ${token}` },
          params: { withTrashed: true } // Agrega este parámetro para incluir usuarios soft deleted
        })
        .then(response => {
          const user = response.data.data;
          console.log(user);
          const newRows = [...user]; // Copia los usuarios obtenidos en una nueva variable
          rows.value = newRows; // Asigna los nuevos usuarios a rows.value
        })
        .catch(error => {
          console.error(error);
        });
    };

    const onToggleInactive = (showInactive) => {
      console.log(showInactive.value)
      if (showInactive) {
        console.log("muestra borrados")
        infoUserDeleted();
      } else {
        console.log("quita los borrados")
        obtenerInformacionUsuario();
      }
    };

    return {
      onRowClick,
      columns,
      onToggleInactive,
      rows,
    };
  },
}
</script>

