const Layout = () => import("@/layout/index.vue")
export default {
  path: "/user",
  name: "User",
  meta: { title: "个人中心", icon: "UserOutlined", hidden: false },
  component: Layout,
  redirect: "/user/info",
  children: [
    {
      path: "info",
      name: "UserInfo",
      meta: { title: "个人信息", hidden: false },
      component: () => import("@/pages/User/User-Info.vue")
    },
  ],
}
