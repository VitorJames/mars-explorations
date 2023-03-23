import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Mars Explorations - Home",
    component: () =>
      import("./../views/Home")
  },
  {
    path: "/rovers",
    name: "Mars Explorations - Rovers",
    component: () =>
      import("./../views/Rovers")
  },
  {
    path: "/about",
    name: "Mars Explorations - Sobre",
    component: () =>
      import("./../views/About")
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
