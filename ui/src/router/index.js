import { createRouter, createWebHashHistory } from "vue-router";
import Clients from "../views/Clients.vue";
import WorkoutDetail from "../views/WorkoutDetail.vue";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";

const routes = [
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/workout/:id",
    name: "workout-detail",
    component: WorkoutDetail,
    props: true,
  },
  {
    path: "/",
    redirect: "/login",
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
  {
    path: "/exercises",
    name: "Exercises",
    component: () => import("../views/Exercise.vue"), // Adjust the path if your component is stored elsewhere
  },
  {
    path: "/exercises/:id",
    name: "ExerciseDetail",
    component: () => import("../views/ExerciseDetail.vue"),
    props: true,
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
