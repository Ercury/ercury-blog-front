import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
{
    path: '/',
    name:'Home',
    component: ()=> import('@/pages/Home/Home.vue')
}

]

/* 创建路由 */
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router;