const Layout = () => import("@/layout/index.vue");
export default {
  path: "/category",
  name: "Category",
  meta: { title: "menu.category", icon: "Discount",  hidden: false },
  component: Layout,
  redirect: "/Category/list",
  children: [
    {
      path: "categoryList",
      name: "categoryList",
      meta: { title: "menu.category_list", hidden: false },
      component: () => import("@/pages/Category/CategoryList.vue"),
    },
    {
      path: "tagList",
      name: "tagList",
      meta: { title: "menu.tag_list", hidden: false },
      component: () => import("@/pages/Category/TagList.vue"),
    },
  ],
}
