import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

import Vuex from "vuex"
Vue.use(Vuex);

import ajax from "@/common/axios.js"
import Login from "./login.vue"
import router from "./router/router"
import 'element-ui/lib/theme-chalk/index.css';

import vuexStore from '@/common/vuexStore.js'

const store = vuexStore(Vuex);
Vue.prototype.$ajax = ajax;

import storageUtil from '@/common/storageUtil.js'
window.storageUtil = storageUtil;

import {
    Form,
    FormItem,
    Button,
    Input,
    Col,
    Checkbox,
    Dialog
} from 'element-ui';
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Col.name, Col);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Dialog.name, Dialog);
let v = new Vue({
    el: "#app",
    store: store,
    router: router,
    render: h => h(Login)
})