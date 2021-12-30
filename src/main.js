// 该文件是整个项目的入口文件

//引入Vue
import Vue from "vue";
//引入App组件，它是所有组件的父组件
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

// 引入 axios
import axios from "axios";
Vue.prototype.$axios = axios;

// axios.defaults.baseURL = "http://z-hand.site"; //请求的默认地址
axios.defaults.baseURL = "/api"; //请求的默认地址
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] = "application/json";

Vue.config.productionTip = false;
new Vue({
    axios,
    router,
    store,
    // 将App组件放入容器中
    render: (h) => h(App),
}).$mount("#app");
