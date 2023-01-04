const Layout = () => import("@/layout/index.vue")
export default {
  path: "/message",
  name: "Message",
  meta: { title: "menu.message", icon: "MessageOutlined",  hidden: false },
  component: Layout,
  redirect: "/message/list",
  children: [
    {
      path: "list",
      name: "messageList",
      meta: { title: "menu.message_list", hidden: false },
      component: () => import("@/pages/Message/Message.vue"),
    }
  ],
}
