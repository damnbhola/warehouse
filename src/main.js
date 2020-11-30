import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./stores";
import "./assets/styles.css";

new Vue({
  router,
  store,
  el: "#app",
  created() {
    this.$store.dispatch("warehouse/fetchWarehouses");
    this.someWork();
  },
  watch: {
    $route: "someWork"
  },
  methods: {
    someWork() {}
  },
  render: h => h(App)
});
