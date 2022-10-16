import { createRouter, createWebHistory } from "vue-router";
import Clients from "../views/Clients.vue";
const routes = [
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/weights",
    name: "Weights",

    component: () => import("../views/Weights.vue"),
  },
  {
    path: "/workouts",
    name: "Workouts",

    component: () => import("../views/Workouts.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
