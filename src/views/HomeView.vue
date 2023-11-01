<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
          :src="require('../assets/user_admin.png')"
          class="my-3"
          contain
          height="200"
        />
        </v-col>
        </v-row>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
         Administrador de Usuarios
        </h1>


        <p class="subheading font-weight-regular">
          <a
            href="http://localhost:8081/login"
          >Gestion De Usuarios</a>
        </p>
      </v-col>
      <v-col class="mb-4">
        <p class="subheading font-weight-regular">
          <a
            href="http://localhost:8081/consultaUsuarios"
          >Consulta de Usuarios</a>
        </p>
      </v-col>
     </v-container>
   
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
