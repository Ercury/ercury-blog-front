const Layout = () => import("@/layout/index.vue");
export default {
  path: "/category",
  name: "Category",
  meta: { title: "menu.category", icon: "Discount",  hidden: false },
  component: Layout,
  redirect: "/Category/list",
  children: [
    {
      path: "list",
      name: "categoryList",
      meta: { title: "menu.category_list", hidden: false },
      component: () => import("@/pages/Category/CategoryList.vue"),
    },
    {
      path: "edit",
      name: "categoryEdit",
      meta: { title: "menu.category_edit", hidden: false },
      component: () => import("@/pages/Category/CategoryEdit.vue"),
    },
  ],
}
