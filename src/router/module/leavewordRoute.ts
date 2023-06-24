const Layout = () => import("@/layout/index.vue");
export default {
  path: "/message",
  name: "Message",
  meta: { title: "menu.message", icon: "Message",  hidden: false },
  component: Layout,
  redirect: "/message/list",
  children: [
    {
      path: "list",
      name: "messageList",
      meta: { title: "menu.message_list", hidden: false },
      component: () => import("@/pages/backend/Message/Message.vue"),
    }
  ],
}
