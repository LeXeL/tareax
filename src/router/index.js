import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "../views/Home.vue";
import SearchResults from "@/views/SearchResults";
import UserPublications from "@/views/UserPublications";
import NewPublication from "@/views/NewPublication";
import Profile from "@/views/Profile";
import MyPublications from "@/views/MyPublications";
import Admin from "@/views/Admin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/user-publications",
    name: "UserPublications",
    component: UserPublications,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/new-publication",
    name: "NewPublication",
    component: NewPublication,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/my-publications",
    name: "MyPublications",
    component: MyPublications,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
