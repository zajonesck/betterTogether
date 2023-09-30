// Vue and main App
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Styling and Icons
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
import awsmobile from "../../api/aws-exports";

// Configure AWS Amplify
Amplify.configure(awsmobile);

// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
  },
});

// Create and mount Vue App
createApp(App).use(router).use(vuetify).mount("#app");
