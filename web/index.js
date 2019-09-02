import Vue from "vue"
import VueRouter from "vue-router"
import ajax from "./src/common/axios.js"
import App from "./app.vue"
import router from "./router/router"
import loading from "./src/plugin/commonComonet/loading.vue"
Vue.component("loading",loading);
Vue.use(VueRouter);
Vue.prototype.$ajax = ajax;

let v=new Vue({
    el:"#app",
    router:router,
    render:h=>h(App)
})