import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import UsuariosView from '../views/UsuariosView.vue';
import ConsultaUsuariosView from '../views/ConsultaUsuariosView.vue';
import LoginForm from "../views/LoginForm.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/usuarios',
    name: 'homeUsuarios',
    component: UsuariosView
  },
  {
    path: '/consultaUsuarios',
    name: 'consultaUsuarios',
    component: ConsultaUsuariosView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
