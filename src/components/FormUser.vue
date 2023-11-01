<template>
    <v-card width="150%">
        <v-card-text>
        
        {{ operacion == 'INSERTAR' ? 'ALTA NUEVO USUARIO':'ACTUALIZACIÓN USUARIO'}}
        </v-card-text>
        <v-card-text>
            <form @submit.prevent="submit">
            <v-text-field
            v-model="usuario.login"
            label="Login"
            ></v-text-field>
            <v-text-field
            hint="Enter your password to access this website"
            label="Password"
            persistent-hint
            type="password"
            v-model="usuario.password"
            :disabled="operacion != 'INSERTAR'"
            ></v-text-field>
            <v-text-field
            v-model="usuario.nombre"
            label="Nombre"
            ></v-text-field>

            <v-text-field
            v-model="usuario.apellidoPaterno"
            label="Apellido Paterno"
            ></v-text-field>
            <v-text-field
            v-model="usuario.apellidoMaterno"
            label="Apellido Materno"
            ></v-text-field>
            <v-text-field
            v-model="usuario.cliente"
            label="Cliente"
            type="number"
            ></v-text-field>
            <v-text-field
            hide-details="auto"
            label="Email address"
            placeholder="josealejandrolopezjaimes@gmail.com"
            type="email"
            v-model="usuario.email"
            ></v-text-field>
            <v-text-field
            v-model="usuario.area"
            label="Area"
            type="number"
            ></v-text-field>
            <label>Fecha Vigencia:</label>
            <Datepicker v-model="usuario.fechaVigencia" 
            style="border: 3px; background-color:darkgray;" :clearable="true" />
            <div>
                <label>Estatus:</label>   
                <v-select
                    v-model="usuario.estatus"
                    :items="items"
                    label="Estatus Usuario"
                    persistent-hint
                    return-object
                    single-line
                    :disabled="operacion == 'INSERTAR'"
                ></v-select>
            </div>
            
        </form>

        </v-card-text>
        <v-card-actions>
            <v-btn color="secundary" @click="onClickCloseWindow">CERRAR</v-btn>
            <v-btn color="primary"  @click="onClickSaveUser">{{ operacion == 'INSERTAR'?'GUARDAR':'ACTUALIZAR' }}</v-btn>
        </v-card-actions>
    </v-card>

    
</template>

<script setup>

import {ref,toRefs,onMounted} from 'vue';
import { VDatePicker } from 'vuetify/labs/VDatePicker';
import requestJava from '@/utils/requestJava';
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";
import Datepicker from 'vue3-datepicker'

const emit = defineEmits(['onClickCloseWindowUsuario'])

  //Propiedades para manejo del dialog de user
  //https://vuetifyjs.com/en/components/date-pickers/#allowed-dates
  const propsFormUser = defineProps({
      usuario: Object,
      operacion: String
      }
    );
    const {usuario,operacion} = toRefs(propsFormUser);
    const showDatePicker = ref(false);
    const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10));
    const dateFormatted = ref(new Date());
    const items = ref( ['A', 'I', 'R']);

    function parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    // lifecycle hooks
    function onClickCloseWindow(){
        emit('onClickCloseWindowUsuario');
    }

    const onClickSaveUser =  async () => {
        var urlRequest =   operacion.value == 'INSERTAR'?  '/usuarios/create': '/usuarios/update';
        var methodRequest =   operacion.value == 'INSERTAR'?  'post': 'put';

            requestJava(
                        {
                            url: urlRequest,
                            method: methodRequest,
                            data: usuario.value
                        }).then( res => {
                            var textMessage = operacion.value == 'INSERTAR' ? "Usuario creado correctamente":"Usuario actualizado correctamente";
                            notify({
                                title: "Información del Sistema",
                                text:  textMessage,
                                position: "center"
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


   
        emit('onClickCloseWindowUsuario');
    }

    onMounted(() => {
    });

</script>