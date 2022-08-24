import type { RouteRecordRaw } from "vue-router";

const menusRoute: Array<RouteRecordRaw> = [
    {
        path: "dashboard",
        name: "dashboard",
        component: () => import('@/pages/Dashboard/Dashboard.vue')
    },
    {
        path: "user",
        name: "user",
        component: () => import('@/pages/User/User.vue')
    },

    {
        path: "articleList",
        name: "articleList",
        component: () => import('@/pages/Article/Article.vue')
    },
    {
        path: "articleWrite",
        name: "articleWrite",
        component: () => import('@/pages/Article/Article-info.vue')
    },
    {
        path: "categoryManage",
        name: "categoryManage",
        component: () => import('@/pages/Category/CategoryManage.vue')
    },
    {
        path: "tagsManage",
        name: "tagsManage",
        component: () => import('@/pages/Category/TagsManage.vue')
    },

    {
        path: "message",
        name: "message",
        component: () => import('@/pages/Message/Message.vue')
    },

    {
        path: "403",
        name: "403",
        component: () => import('@/pages/Abnormal/403.vue')
    },
    {
        path: "404",
        name: "404",
        component: () => import('@/pages/Abnormal/404.vue')
    },
    {
        path: "permissionSetting",
        name: "permissionSetting",
        component: () => import('@/pages/Setting/Permission-setting.vue'),
    },
    {
        path: "Systemsetting",
        name: "Systemsetting",
        component: () => import('@/pages/Setting/System-setting.vue'),
    }
]

export default menusRoute;