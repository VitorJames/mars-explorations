import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import config from "./services/config.js";
import vuetify from "./plugins/vuetify";

axios.defaults.baseURL = config.baseURLApi;

Vue.prototype.axios = axios
Vue.prototype.$apiKey = "ao9hjfVGTtepu75AlOayR9N09bSaJaAR9zjPHLD5";
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount("#app");
