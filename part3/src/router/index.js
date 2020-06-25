import Vue from "vue";
import VueRouter from "vue-router";
import Part3 from "../views/Part3.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Part3",
    component: Part3
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
