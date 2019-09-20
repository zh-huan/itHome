import Vue from "vue"
import VueRouter from "vue-router"
import ajax from "./src/common/axios.js"
import Login from "./login.vue"
import router from "./router/router"
Vue.use(VueRouter);
Vue.prototype.$ajax = ajax;

let v=new Vue({
    el:"#app",
    router:router,
    render:h=>h(Login)
})