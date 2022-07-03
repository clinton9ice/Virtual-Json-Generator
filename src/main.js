import { createApp } from "vue";
import App from "@/layout";
import router from "@/router";
import store from "@/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/scss/app.scss";
import "vue-code-highlight/themes/prism-twilight.css";

import VueCodeHighlight from "vue-code-highlight";

createApp(App).use(VueCodeHighlight).use(store).use(router).mount("#app");
