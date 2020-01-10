import VueRouter from "vue-router"
import Index from "../src/plugin/indexComponet/indexTemplate.vue"
import Search from "../src/plugin/searchComponet/searchTemplate.vue"
import Register from "../src/plugin/userComponet/register.vue"
import Login from "../src/plugin/userComponet/login.vue"
import NotFoundComponent from "../src/plugin/commonComponet/notFoundComponent.vue"
import WriteArticle from "@/plugin/articleComponet/writeArticle.vue"

const router = new VueRouter({
    mode: 'history', //去掉url中的#
    routes: [{
            path: '/search',
            name: "search",
            component: Search
        },
        {
            path: '/index/:type',
            name: "index",
            component: Index
        },
        {
            path: '/login',
            name: "login",
            component: Login
        },
        {
            path: '/login/regist',
            name: "regist",
            component: Register
        },
        {
            path: '/write-article',
            name: "writearticle",
            component: WriteArticle
        },
        {
            path: '*',
            component: NotFoundComponent
        }
    ]
})
export default router;