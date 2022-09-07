import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { defineAsyncComponent } from 'vue' // 引入defineAsyncComponent

const modules: Record<string, {[key: string]: any}> =import.meta.glob('./module/*.ts', {eager: true});
const allRoutes: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList: Array<RouteRecordRaw>  = Array.isArray(mod) ? [...mod] : [mod];
    console.log(modList);
    allRoutes.push(...modList);
});

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect:'/login'
    }, 
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/Home/Home.vue'),
        children: [
            ...allRoutes
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: defineAsyncComponent(() => import('@/pages/Login/Login.vue'))
    },


]

/* 创建路由 */
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router;