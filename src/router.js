import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: function() {
      return import(
        /* webpackChunkName: "conduit-home-page" */ "./conduit-pages-home.vue"
      );
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
