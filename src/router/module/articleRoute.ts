const Layout = () => import("@/layout/index.vue")
export default {
  path: "/article",
  name: "Article",
  meta: { title: "menu.article", icon: "FileMarkdownOutlined",  hidden: false },
  component: Layout,
  redirect: "/article/list",
  children: [
    {
      path: "list",
      name: "articleList",
      meta: { title: "menu.article_list", hidden: false },
      component: () => import("@/pages/Article/Article-List.vue"),
    },
    {
      path: "write",
      name: "articleWrite",
      meta: { title: "menu.article_write", hidden: false },
      component: () => import("@/pages/Article/Article-Write.vue"),
    },
  ],
}
