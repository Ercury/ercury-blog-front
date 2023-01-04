const Layout = () => import("@/layout/index.vue")
export default {
  path: "/permission",
  name: "Permission",
  meta: { title: "menu.permission", icon: "IdcardOutlined", hidden: false },
  component: Layout,
  redirect: "/permission/403",
  children: [
    {
      path: '403',
      name: '403',
      meta: {title: 'menu.403page', needCache: false},
      component:  () => import('@/pages/Abnormal/403.vue')
    },
    {
      path: '404',
      name: '404',
      meta: {title: 'menu.404page', needCache: false},
      component:  () => import('@/pages/Abnormal/404.vue')
    }
  ]
}
