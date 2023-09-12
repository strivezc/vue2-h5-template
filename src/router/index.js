import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/h5/",
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    /**
     * 全局页面
     */
    {
      path: "/index",
      name: "index",
      component: (resolve) => require(["@/pages/home/index"], resolve),
    },
    {
      path: "/agreement",
      name: "Agreement",
      component: (resolve) => require(["@/pages/agreement/index"], resolve),
    },
  ],
});
