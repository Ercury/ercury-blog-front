const Layout = () => import("@/layout/index.vue")
export default {
  path: "/category",
  name: "Category",
  meta: { title: "分类管理", icon: "TagsOutlined",  hidden: false },
  component: Layout,
  redirect: "/Category/list",
  children: [
    {
      path: "list",
      name: "categoryList",
      meta: { title: "分类列表", hidden: false },
      component: () => import("@/pages/Category/Category-List.vue"),
    },
    {
      path: "edit",
      name: "categoryEdit",
      meta: { title: "分类管理", hidden: false },
      component: () => import("@/pages/Category/Category-Edit.vue"),
    },
  ],
}
