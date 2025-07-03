import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '../views/CalendarView.vue'
import FreieSlotsView from '@/views/FreieSlotsView.vue'
import MeineTermineView from '@/views/MeineTermineView.vue'
import LogoutView from '@/views/LogoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/freie-slots',
      name: 'Verfügbare Slots',
      component: FreieSlotsView,
    },
    {
      path: '/meine-termine',
      name: 'Meine Termine',
      component: MeineTermineView,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView,
    },
  ],
})

export default router
