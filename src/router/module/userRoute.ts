const Layout = () => import("@/layout/index.vue")
export default {
  path: "/user",
  name: "User",
  meta: { title: "menu.account_center", icon: "UserOutlined", hidden: false },
  component: Layout,
  redirect: "/user/info",
  children: [
    {
      path: "info",
      name: "UserInfo",
      meta: { title: "menu.user_info", hidden: false },
      component: () => import("@/pages/User/User-Info.vue")
    },
  ],
}
