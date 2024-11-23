import { createRouter, createWebHistory } from 'vue-router'
import AnimeView from '../views/AnimeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'anime',
      component: AnimeView,
    },
    {
      path: '/manga',
      name: 'manga',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MangaView.vue'),
    },
  ],
})

export default router

