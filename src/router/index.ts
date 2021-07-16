import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/game",
        name: "Game",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Game.vue"),
    },
    {
        path: "/history",
        name: "History",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/History.vue"),
    },

    {
        path: "/*",
        name: "notFound",
        component: () => import("@/views/404.vue"),
    },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});

export default router;
