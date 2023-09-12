// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Vconsole from "vconsole";

// 添加Fastclick移除移动端点击延迟
import FastClick from "fastclick";
import Vant from "vant";
import "vant/lib/index.css";
import "./utils/routeControl"; // routeControl
Vue.prototype.$bus = new Vue();
Vue.use(Vant);


router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next();
})

//FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month"
  ) {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

FastClick.attach(document.body);
Vue.config.productionTip = false;

if (process.env.NODE_ENV !== "production") {
  new Vconsole();
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
