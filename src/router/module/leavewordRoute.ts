const Layout = () => import("@/layout/index.vue")
export default {
  path: "/message",
  name: "Message",
  meta: { title: "留言管理", icon: "MessageOutlined",  hidden: false },
  component: Layout,
  redirect: "/message/list",
  children: [
    {
      path: "list",
      name: "messageList",
      meta: { title: "留言列表", hidden: false },
      component: () => import("@/pages/Message/Message.vue"),
    }
  ],
}
