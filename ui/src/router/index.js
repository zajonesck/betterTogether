import { createRouter, createWebHashHistory } from "vue-router";
import Clients from "../views/Clients.vue";
const routes = [
  {
    path: "/client-roster",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/weight-history",
    name: "Weights",

    component: () => import("../views/Weights.vue"),
  },
  {
    path: "/workout-rx",
    name: "Workouts",

    component: () => import("../views/Workouts.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
