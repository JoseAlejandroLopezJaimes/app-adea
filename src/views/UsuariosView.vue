<template>
    
    <div class="home">
      <p class="subheading font-weight-regular">
          <a
            href="http://localhost:8081/"
          >Home</a>
        </p>
      <v-data-table
          :headers="headers"
          :items="listUsuarios"
          item-value="name"
          class="elevation-1">
          <template v-slot:top>
            <v-toolbar  flat>
              <v-toolbar-title>Managment for Users</v-toolbar-title>
              <v-btn
              color="primary"
              dark
              class="mb-2"
              @click = onClickShowFormUser>
                  Nuevo Usuario
                  <v-dialog
                    v-model="showDialogUser"
                    width="auto"
                  >
                    <form-user :usuario="usuario" 
                    :operacion="operacionForm"
                    @on-click-close-window-usuario="onClickCloseFormUsuario"
                    />
                  </v-dialog>
                </v-btn>

                <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Esta seguro de eliminar el Usuario?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialogDelete">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="onClickConfirmDeleteUsuario">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
              <v-icon
                size="small"
                class="me-2"
                @click="onClickEditUsuario(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                size="small"
                class="me-2"
                @click="showDialogDeleteUsuario(item)">
                mdi-delete
              </v-icon>
              </template>


        </v-data-table>
    </div>
  </template>

  <script setup>

  import { ref,onMounted,defineEmits} from 'vue';
  import requestJava from '@/utils/requestJava';
  import { VDataTable } from 'vuetify/labs/VDataTable';
  import FormUser from '@/components/FormUser.vue';
  import { notify } from "@kyvg/vue3-notification";

  
  const eventFormUser = defineEmits(['showForm'])

  /*
  //https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api
  var listUsuarios = (await requestJava(
              { url: '/usuarios/all',
                method: 'get'
              }).then(
              async function (res) {
                return res;
              }).catch(error => {
              console.log('Error: ',error.toString());
            })
          ).data;
    
    
    axios
      .get('http://localhost:8080/usuarios/all')
      .then((response) => {
        console.log(response)
      })

    console.log('Valores obtenidos: ',listUsuarios)

    */
    const headers = ref([
        { title: 'Nombre',align: 'start', key: 'nombre'},
        { title: 'Login', key: 'login' }, { title: 'Fecha Alta', key: 'fechaAlta' },
        { title: 'Estatus', key: 'estatus' },{ title: 'Actions', key: 'actions', sortable: false },
      ]);
      
    const usuario = ref(null);
    const listUsuarios = ref(null);
    const operacionForm = ref('INSERTAR');
    const usuarioDefault = ref({
      "id": -1,
        "login": '',
        "nombre": '',
        "password": '',
        "cliente": 0.0,
        "email": '',
        "fechaAlta": '',
        "fechaBaja": null,
        "estatus": 'A',
        "intentos": 0.0,
        "fechaRevocado": null,
        "fechaVigencia": new Date(),
        "noAcceso": null,
        "apellidoPaterno": '',
        "apellidoMaterno": '',
        "area": 0,
        "fechaModificacion": ''
    })
    
    const showDialogUser = ref(false);
    const dialogDelete = ref(false);
    const idUserDelete = ref(null);

   

    usuario.value = {
        "id": -1,
        "login": "testlogin",
        "nombre": "test",
        "password": "testpassword",
        "cliente": 0.0,
        "email": "test@hotmail.com",
        "fechaAlta": "2023-10-26T00:00:00.000+00:00",
        "fechaBaja": null,
        "estatus": "A",
        "intentos": 0.0,
        "fechaRevocado": null,
        "fechaVigencia": new Date(),
        "noAcceso": null,
        "apellidoPaterno": "paterno test",
        "apellidoMaterno": "materno test",
        "area": 1,
        "fechaModificacion": "2023-10-26T00:00:00.000+00:00"
    }


    listUsuarios.value = (await requestJava(
              { url: '/usuarios/all',
                method: 'get'
              }).then(
              async function (res) {
                return res;
              }).catch(error => {
                console.log('Error general',error)
              console.log('Error: ',error.toString());
            })
          ).data;
    

function onClickShowFormUser(){
  showDialogUser.value = true;
  usuario.value = usuarioDefault;
  operacionForm.value = 'INSERTAR'
}

function onClickCloseFormUsuario(){
  usuario.value = usuarioDefault;
  showDialogUser.value = false;
}

function onClickEditUsuario(editUsuario){
  usuario.value = Object.assign(editUsuario);
  usuario.value.fechaVigencia = new Date(editUsuario.fechaVigencia);
  operacionForm.value = 'ACTUALIZAR'
  showDialogUser.value = true;
}


const showDialogDeleteUsuario = (removeUsuario) =>{
   idUserDelete.value = removeUsuario.id;
   dialogDelete.value = true
};

const closeDialogDelete = () =>{
   dialogDelete.value = false
}

const onClickConfirmDeleteUsuario = () => {
      requestJava( {
                      url: '/usuarios/delete/'+ idUserDelete.value,
                      method: 'DELETE'
                  }).then( res => {
                            notify({
                                title: 'Información del Sistema',
                                text:  'Usuario eliminado correctamente'
                            });
                            return res;
                        }).catch(error => {
                            notify({
                            title: "Error del sistema",
                            text:  error.response.data,
                            position: "center",
                            type: 'error',
                        });
                        console.log('Error: ',error.toString());
                    });
    closeDialogDelete();
}

    // lifecycle hooks
onMounted(() => {
  console.log('Initial mounted')
})
  </script>