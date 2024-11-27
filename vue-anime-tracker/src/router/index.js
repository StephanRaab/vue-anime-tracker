import { createRouter, createWebHistory } from 'vue-router'
import AnimeView from '../views/AnimeView.vue'
import MangaView from '@/views/MangaView.vue'

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
      component: MangaView
    },
  ],
})

export default router

