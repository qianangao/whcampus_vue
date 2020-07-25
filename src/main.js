import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import element from "./element/index";
import echarts from "echarts";
import "@/styles/index.css";
import $ from "jquery";
import "babel-polyfill"
import store from "@/store/index"


Vue.prototype.$echarts = echarts;

Vue.use(element);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
