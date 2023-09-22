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

// AWS Amplify
import { Amplify } from "aws-amplify";
// import { awsconfig } from "./aws-exports";
// Amplify.configure(awsconfig);

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
