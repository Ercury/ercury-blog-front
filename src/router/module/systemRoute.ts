const Layout = () => import("@/layout/index.vue")
export default {
  path: "/system",
  name: "System",
  meta: { title: "menu.system", icon: "SettingOutlined", hidden: false },
  component: Layout,
  redirect: "/system/systemManage",
  children: [
    {
      path: 'systemManage',
      name: 'SystemMange',
      meta: {title: 'menu.system_manage', needCache: false},
      component:  () => import('@/pages/Setting/System-setting.vue')
    }
  ]
}
