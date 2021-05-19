import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import("../views/Home" /* webpackChunkName: "home" */);
const Game = () => import("../views/Game" /* webpackChunkName: "game" */);

const routes = [
    {
        path: '/moveamaze',
        name: 'Home',
        component: Home
    },
    {
        path: '/moveamaze/:gameId',
        name: 'Game',
        component: Game
    }
];

const router = createRouter({
    history: createWebHistory(),
    base: "moveamaze",
    routes
});

export default router
