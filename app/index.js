import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

import Vuex from "vuex"
Vue.use(Vuex);

import vuexStore from '../commonUtil/vuexStore.js'
const store = vuexStore(Vuex);

import App from "./app.vue"
import router from "./router/router"


import axios from "../commonUtil/axios.js"
Vue.prototype.$ajax = axios

import( /* webpackChunkName: "storageUtil" */ "../commonUtil/storageUtil.js").then(storageUtil => {
    window.storageUtil = storageUtil.default;
})

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import '../commonUtil/dateformat.js'

let v = new Vue({
    el: "#app_app",
    store: store,
    router: router,
    render: h => h(App)
})