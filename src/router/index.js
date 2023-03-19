import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Mars Explorations",
    component: () =>
      import("./../components/FindImages")
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
