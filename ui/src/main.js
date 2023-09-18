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
import { VDataTable } from "vuetify/labs/VDataTable";

//AWS
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports"; // This file will be created later

Amplify.configure(awsconfig);

if (typeof global === "undefined") {
  window.global = window;
}

const vuetify = createVuetify({
  components: {
    VDataTable,
  },
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
  },
});

createApp(App).use(router).use(vuetify).mount("#app");
