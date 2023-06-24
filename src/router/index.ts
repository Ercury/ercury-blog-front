import { useTagsViewStore } from "@/store/module/useTagsViewStore";
import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw, _RouteRecordBase } from "vue-router";
import Layout from "@/layout/index.vue";
const modules: Record<string, {[key: string]: any}> =import.meta.glob('./module/*.ts', {eager: true});
const allRoutes: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList: Array<RouteRecordRaw>  = Array.isArray(mod) ? [...mod] : [mod];
    console.log(modList);
    allRoutes.push(...modList);
});

/*
  config
    path                路径
    name                唯一name 大驼峰
    redirect            重定向(默认 '')
    component           路由对应组件
    hidden:true         是否在左侧菜单隐藏(默认 false)
    meta
      title             名称 (默认 '')
      icon              左侧菜单icon (默认 '')
      notNeedAuth:true  该路由是否不需要鉴权(默认 false)
      needCache:true    该路由是否需要缓存(默认 false)
      fixed:true        如果设置为true，该路由会固定在visited-view中(默认 false)
*/
// 无需权限的路由
export const routes: Array<RouteRecordRaw> = [
    {
      path: "/login",
      name: "Login",
      meta: { notNeedAuth: true, hidden: true},
      component: () => import("@/pages/backend/Login/Login.vue")
    },
    {
        path: "/403",
        name: "NotPermission",
        component: () => import('@/pages/backend/Abnormal/403.vue')
    },
    // 匹配所有路径  vue2使用*  vue3使用/:pathMatch(.*)或/:catchAll(.*)
    {
      path: "/404",
      name: "NotFund",
      meta: { notNeedAuth: true, hidden: true },
      component: () => import("@/pages/backend/backend/Abnormal/404.vue"),
    }
  ]

// 需要校验权限的路由
export const permissionRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Root",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                meta: {
                    title: "menu.dashboard",
                    icon: "PieChart",
                    needCache: true,
                    fixd: true
                },
                component: () => import('@/pages/backend/Dashboard/Dashboard.vue')
            }
        ]
    },
    ...allRoutes,
    {
      path: "/:catchAll(.*)",
      meta: { hedden: true },
      redirect: "/404"
    },
]


/* 创建路由 */
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由前置守卫
router.beforeEach((to) => {
  /*
    false 以取消导航
    一个路由
    不返回或者返回true 则去to
    如果遇到了意料之外的情况，可能会抛出一个 Error 这会取消导航并且调用 router.onError() 注册过的回调
    也就是用不到next了，但是next还是可以使用
  */
  // 如果to需要鉴权 首次加载默认寻找路径'/'一下条件成立
  if (!to.meta.notNeedAuth) {
    // 获取userInfo
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') as string);
    // 如果未登录
    if (!userInfo?.username || !userInfo?.token) {
      return { name: "Login" }
    }
  }
})

// 路由后置守卫
router.afterEach((to: RouteLocationNormalized): void => {
  const tagsViewStore = useTagsViewStore()
  // 添加路由缓存
  if (to.name && to.meta && to.meta.needCache) {
    tagsViewStore.addCacheView(to.name.toString())
  }
  const { name, path, meta, params, query } = to
  // 添加访问过路由
  if (to.meta && !to.meta.notNeedAuth) {
    tagsViewStore.addVisitedView({
      name,
      path,
      meta,
      params,
      query,
    } as _RouteRecordBase)
  }
})


export default router;