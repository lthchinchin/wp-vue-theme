import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// main.js


new Vue({ store, render: (h) => h(App), mounted() { } }).$mount("#root");

