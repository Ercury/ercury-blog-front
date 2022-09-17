const Layout = () => import("@/layout/index.vue")
export default {
  path: "/permission",
  name: "Permission",
  meta: { title: "权限管理", icon: "IdcardOutlined", hidden: false },
  component: Layout,
  redirect: "/permission/403",
  children: [
    {
      path: '403',
      name: '403',
      meta: {title: '403', needCache: false},
      component:  () => import('@/pages/Abnormal/403.vue')
    },
    {
      path: '404',
      name: '404',
      meta: {title: '404', needCache: false},
      component:  () => import('@/pages/Abnormal/404.vue')
    }
  ]
}
