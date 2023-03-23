import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue"

const routes = [
    {
        path: "/",
        name: "/login",
        component: Login,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/register",
        name: "Register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../components/Register.vue"),
    },
 {
        path: "/imageUpload",
        name: "Image Upload",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../components/UploadImage.vue"),
    },
    
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
