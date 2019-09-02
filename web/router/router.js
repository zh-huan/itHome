import VueRouter from "vue-router"
import index from "../src/plugin/indexComponet/indexTemplate.vue"
import NotFoundComponent from "../src/plugin/commonComonet/notFoundComponent.vue"
const router = new VueRouter({
    mode: 'history',  //去掉url中的#
    routes : [
        {path: '/:type',name:"index", component: index},
        { path: '*', component: NotFoundComponent }
    ]
})
export default router;