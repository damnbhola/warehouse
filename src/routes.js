import Vue from "vue";
import Router from "vue-router";
import Index from "./Pages/Index.vue";
import Warehouse from "./Pages/Warehouse.vue";
import Navbar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: Navbar, footer: Footer }
    },
    {
      path: "/:id",
      name: "warehouse",
      components: { default: Warehouse, header: Navbar, footer: Footer }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
