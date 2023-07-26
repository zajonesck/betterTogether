import { createRouter, createWebHashHistory } from "vue-router";
import Clients from "../views/Clients.vue";

const routes = [
  {
    path: "/",
    redirect: "/client-roster", // This will automatically redirect from the root to /client-roster
  },
  {
    path: "/client-roster",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/weight-history/:clientId",
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
