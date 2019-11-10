import Vue from "vue"
import VueRouter from "vue-router"
import ajax from "./src/common/axios.js"
import Login from "./login.vue"
import router from "./router/router"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueRouter);
Vue.prototype.$ajax = ajax;

import { Form, FormItem,Button,Input,Col,Checkbox } from 'element-ui';
Vue.component(Form.name,Form);
Vue.component(FormItem.name,FormItem);
Vue.component(Button.name,Button);
Vue.component(Input.name,Input);
Vue.component(Col.name,Col);
Vue.component(Checkbox.name,Checkbox);
let v=new Vue({
    el:"#app",
    router:router,
    render:h=>h(Login)
})