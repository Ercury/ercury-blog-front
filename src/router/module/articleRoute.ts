const Layout = () => import("@/layout/index.vue")
export default {
  path: "/article",
  name: "Article",
  meta: { title: "文章管理", icon: "FileMarkdownOutlined",  hidden: false },
  component: Layout,
  redirect: "/article/list",
  children: [
    {
      path: "list",
      name: "articleList",
      meta: { title: "文章列表", hidden: false },
      component: () => import("@/pages/Article/Article-List.vue"),
    },
    {
      path: "write",
      name: "articleWrite",
      meta: { title: "文章创作", hidden: false },
      component: () => import("@/pages/Article/Article-Write.vue"),
    },
  ],
}
