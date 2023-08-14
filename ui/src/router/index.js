import { createRouter, createWebHashHistory } from "vue-router";
import Clients from "../views/Clients.vue";
import WorkoutDetail from "../views/WorkoutDetail.vue";

const routes = [
  {
    path: "/workout/:id",
    name: "workout-detail",
    component: WorkoutDetail,
    props: true,
  },
  {
    path: "/",
    redirect: "/client-roster",
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
  // {
  //   path: "/client-detail/:clientId",
  //   name: "ClientDetail",
  //   component: () => import("../views/ClientDetail.vue"),
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
