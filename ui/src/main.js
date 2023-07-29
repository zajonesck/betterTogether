import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// const myCustomLightTheme = {
//   dark: false,
//   colors: {
//     background: "#000000",
//   },
// };

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

createApp(App).use(router).use(vuetify).mount("#app");
