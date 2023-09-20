import { createRouter, createWebHashHistory } from "vue-router";
import { Auth } from "aws-amplify";
import Clients from "../views/Clients.vue";
import WorkoutDetail from "../views/WorkoutDetail.vue";
import LoginPage from "../views/LoginPage.vue";
import SignUpPage from "../views/SignUpPage.vue";

const routes = [
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/workout/:id",
    name: "workout-detail",
    component: WorkoutDetail,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/",
    redirect: "/login",
    meta: { requiresAuth: false },
  },
  {
    path: "/client-roster",
    name: "Clients",
    component: Clients,
    meta: { requiresAuth: true },
  },
  {
    path: "/weight-history/:clientId",
    name: "Weights",
    component: () => import("../views/Weights.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/workout-rx",
    name: "Workouts",
    component: () => import("../views/Workouts.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/exercises",
    name: "Exercises",
    component: () => import("../views/Exercise.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/exercises/:id",
    name: "ExerciseDetail",
    component: () => import("../views/ExerciseDetail.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const session = await Auth.currentSession();
      if (session && session.isValid()) {
        next();
      } else {
        next("/login");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
