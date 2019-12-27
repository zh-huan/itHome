import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

import Vuex from "vuex"
Vue.use(Vuex);

import vuexStore from '@/common/vuexStore.js'

const store = vuexStore(Vuex);

import ajax from "./src/common/axios.js"
import App from "./app.vue"
import router from "./router/router"

import loading from "./src/plugin/commonComonet/loading.vue"
Vue.component("loading",loading);

import contentLoading from "./src/plugin/commonComonet/contentLoading.vue"
Vue.component("contentLoading",contentLoading);

import storageUtil from '@/common/storageUtil.js'
window.storageUtil = storageUtil;

Vue.prototype.$ajax = ajax;
let v=new Vue({
    el:"#app",
    store:store,
    router:router,
    render:h=>h(App)
})