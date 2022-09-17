const Layout = () => import("@/layout/index.vue")
export default {
  path: "/system",
  name: "System",
  meta: { title: "系统管理", icon: "SettingOutlined", hidden: false },
  component: Layout,
  redirect: "/system/systemManage",
  children: [
    {
      path: 'systemManage',
      name: 'SystemMange',
      meta: {title: '系统设置', needCache: false},
      component:  () => import('@/pages/Setting/System-setting.vue')
    }
  ]
}
