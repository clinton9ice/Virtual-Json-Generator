import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/public/Home.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signUp",
    name: "signUp",
    // route level code-splitting
    // this generates a separate chunk (signUp.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signUp" */ "../views/public/SignUp"),
  },
  {
    path: "/signIn",
    name: "signIn",
    // route level code-splitting
    // this generates a separate chunk (signIn.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signIn" */ "../views/public/SignIn"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router
