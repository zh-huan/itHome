import VueRouter from "vue-router"
import index from "../src/plugin/indexComponet/indexTemplate.vue"
import search from "../src/plugin/searchComponet/searchTemplate.vue"
import NotFoundComponent from "../src/plugin/commonComonet/notFoundComponent.vue"

const router = new VueRouter({
    mode: 'history',  //去掉url中的#
    routes: [
        {path: '/search', name: "search", component: search},
        {path: '/index/:type', name: "index", component: index},

        {path: '*', component: NotFoundComponent}
    ]
})
export default router;