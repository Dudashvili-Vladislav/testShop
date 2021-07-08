import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";
import AdminIndex from "@/views/admin/AdminIndex";
import Products from "@/views/admin/Products";
import Category from "@/views/admin/Category";
import Users from "@/views/admin/Users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminIndex,
    children: [
      {
        path: "products",
        name: "Products",
        component: Products,
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
      {
        path: "categories",
        name: "Category",
        component: Category,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
