<template>    
 <v-container fluid>
    <v-radio-group v-model="estatusSearch" inline>
      <v-radio value="A">
        <template v-slot:label>
          <div>Activos</div>
        </template>
      </v-radio>
      <v-radio value="I">
        <template v-slot:label>
          <div>Inactivos</div>
        </template>
      </v-radio>
      <v-radio value="R">
        <template v-slot:label>
          <div>Revocados</div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>


    <div class="home">
      <p class="subheading font-weight-regular">
          <a
            href="http://localhost:8081/"
          >Home</a>
        </p>
        
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" >
              <label>Fecha Inicial:</label>
              <Datepicker v-model="fechaInicial" style="border: 3px; background-color:darkgray;" :clearable="true" />
            </v-col>
            <v-col cols="12" sm="6" md="4"  >
              <label>Fecha Final:</label>
              <Datepicker v-model="fechaFinal"  style="border: 3px; background-color:darkgray;" :clearable="true" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col  cols="12" sm="4">
            <v-text-field v-model="nombreSearch"
              label="Nombre busqueda"
            ></v-text-field>
            
            </v-col>
            <v-col  cols="12" sm="4">
              <v-btn color="secundary" @click="onClickSearchUsuarios" >Buscar</v-btn>
            </v-col>
          </v-row>
          <div class="home">
      <v-data-table
          :headers="headers"
          :items="listUsuarios"
          item-value="name"
          class="elevation-1">
        </v-data-table>
    </div>


        </v-container>

  
        </div>


    </template>

<script setup>

import { ref,onMounted,defineEmits} from 'vue';
import Datepicker from 'vue3-datepicker'
import requestJava from '@/utils/requestJava';
import { VDataTable } from 'vuetify/labs/VDataTable';

const headers = ref([
        { title: 'Nombre',align: 'start', key: 'nombre'},
        { title: 'Apellido Paterno',align: 'start', key: 'apellidoPaterno'},
        { title: 'Apellido Materno',align: 'start', key: 'apellidoMaterno'},
        { title: 'Login', key: 'login' }, { title: 'Fecha Alta', key: 'fechaAlta' }
      ]);

const nombreSearch = ref('');
const fechaInicial = ref(null);
const fechaFinal = ref(null);
const listUsuarios = ref([]);
const estatusSearch = ref('A');

 const onClickSearchUsuarios = async () => {
   var params = new URLSearchParams();
   params.append("estatus", estatusSearch.value);
   
   if(fechaInicial.value != null){
      params.append("fechaInicial", fechaInicial.value.toISOString().slice(0, 10));
   }

   if(fechaFinal.value != null){
      params.append("fechaFinal", fechaFinal.value.toISOString().slice(0, 10));
   }
   if(nombreSearch.value != ''){
      params.append("nombreSearch", nombreSearch.value);
   }


  listUsuarios.value = (await requestJava(
              { url: '/usuarios/search',
                method: 'get',
                params: params
              }).then(
              async function (res) {
                return res;
              }).catch(error => {
                console.log('Error general',error)
              console.log('Error: ',error.toString());
            })
          ).data;
 }

</script>