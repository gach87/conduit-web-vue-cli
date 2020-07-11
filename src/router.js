import Vue from "vue";
import VueRouter from "vue-router";
import ConduitHomePage from "./conduit-home-page";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: function() {
      return import(
        /* webpackChunkName: "conduit-home-page" */ "./conduit-home-page.vue"
      );
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
