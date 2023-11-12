import App from "./App.vue";
import { createApp } from "vue";
import showSwal from "/src/mixins";

import "./assets/css/app.css";

import axios from "./axios";
import store from "./store";
import router from "./router";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

if (token !== null) {
  axios.defaults.headers = { Authorization: `Bearer ${token}` };
  store.commit("setToken", { token });
  store.commit("setUser", { user: JSON.parse(user) });
}

const app = createApp(App);

// Global Props
app.config.globalProperties.$http = axios;
app.config.globalProperties.$alert = showSwal.methods;

// Plugins
app.use(store);
app.use(router);
app.mount("#app");
