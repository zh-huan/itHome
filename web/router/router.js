import VueRouter from "vue-router"
let routes=[
    {
        path: '/search',
        name: "search",
        componentPath: "searchComponet/searchTemplate"
    },
    {
        path: '/index/:type',
        name: "index",
        componentPath:  "indexComponet/indexTemplate",
       // component: r => require.ensure([], () => r(require('../src/plugin/indexComponet/indexTemplate.vue')), 'indexTemplate')
    },
    {
        path: '/login',
        name: "login",
        componentPath: "userComponet/login"
    },
    {
        path: '/login/regist',
        name: "regist",
        componentPath: "userComponet/register"
    },
    {
        path: '/write',
        name: "articleBook",
        meta: { auth: true },
        componentPath: "articleComponet/noteBookManage"
    },
    {
        path: '/write-article',
        name: "writearticle",
        componentPath: "articleComponet/writeArticle"
    },
    {
        path: '/',
        redirect: '/index/'
    },
    {
        path: '*',
        componentPath: "commonComponet/notFoundComponent"
    }
];
for(let item of routes){
    if(!item.componentPath)
        continue;
    item.component=()=>import(/* webpackChunkName: "[request]" */`../src/plugin/${item.componentPath}.vue`)
    .then(module=>{
        return module;
    }).catch(err=>{
        console.error("文件引入报错",err);
    })
    
}
const router = new VueRouter({
    mode: 'history', //去掉url中的#
    routes: routes
});
import { goToLogin } from "@/common/util.js";
// 守卫
router.beforeEach((to, from, next) => {
    // 要访问且未登录需要去登录
    if (to.meta.auth && !localStorage.getItem("token")) {
        goToLogin(to.path);
    } else {
       next(); // 不需登录，继续   
    }
  });


export default router;