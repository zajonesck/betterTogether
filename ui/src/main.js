import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

// import { createRouter, createWebHistory } from "vue-router";
// import Weights from "./components/Weights.vue";

// const routes = [
//   {
//     path: "/",
//     name: "Clients",
//     component: () =>
//       import(/* webpackChunkName: "about" */ "./components/Clients.vue"),
//   },
//   {
//     path: "/Weights",
//     name: "Weights",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "./components/Weights.vue"),
//   },
// ];
// const router = createRouter({
//   history: createWebHistory(process.env.prod),
//   routes,
// });
// export default router;

createApp(App).mount("#app");
