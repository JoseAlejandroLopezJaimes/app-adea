<template>
   <div>
    <v-form>
      <v-container>
      <v-col cols="12">
        <h3 class="title">Login Form</h3>
      </v-col>
        <v-col cols="12">
          <v-text-field label="Login"
             v-model="loginForm.login">
            </v-text-field>
        </v-col>
        <v-col cols="12">
           <v-text-field label="Password"
                         :type="passwordType"
                         v-model="loginForm.password">
          </v-text-field>
        </v-col>
        <v-btn class="mr-2"  color="blue" @click="router.push({ name: 'home' });" >
            Regresar
        </v-btn>
        <v-btn class="mr-2"  color="primary" @click="handleLogin()" >
            Ingresar
        </v-btn>
        <v-btn class="mr-4" color="error" @click="resetForm()">
            Cancelar
        </v-btn>
        <div class="tips">
          <span style="margin-right: 20px">userame: admin</span>
          <span>password: any</span>
        </div>
      </v-container>
    </v-form>
    <!--h1>This is the Login Page</h1-->
  </div>
</template>

<script setup>
import Axios from "axios"
import { ref,onMounted,defineEmits} from 'vue';
import requestJava from '@/utils/requestJava';
import { notify } from "@kyvg/vue3-notification";
import router from "@/router";


const loginForm = ref ({});
const loading = ref(false);
const passwordType = ref('password');
const redirect = ref(undefined);


 const  showPwd = () => {
        if(passwordType.value === 'password'){
          passwordType.value = '';
        } else {
          passwordType.value = 'password'
        }
    }

  const  handleLogin = () => {
    var fechaActual = new Date();

    requestJava({
                    url: '/usuarios/login',
                    method: 'post',
                    data: loginForm.value
                }).then( res => {
                  if(new Date(res.data.fechaVigencia) < fechaActual){
                    notify({
                      title: "Error del sistema",
                      text:  'La fecha de Vigencia del Usuario ha expirado.',
                      position: "center",
                      type: 'error',
                      });
                  } else {
                    router.push({ name: 'homeUsuarios' });
                  }
                }).catch(error => {
                    notify({
                      title: "Error del sistema",
                      text:  'Usuario y/o contraseña incorrectos',
                      position: "center",
                      type: 'error',
                  });
               console.log('Error: ',error.toString());
          });
  }

  const resetForm = () => {
    loginForm.value = {
        login: '',
        password: ''
      }
  };

  onMounted(() => {
    loginForm.value = {
        login: '',
        password: ''
      }
    });
</script>

<style lang="scss">


</style>

<style lang="scss" scoped>

</style>
