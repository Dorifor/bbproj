// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Organisations from "@/views/Organisations.vue";
import Auth from "@/views/Auth.vue";
import Teams from "@/views/Teams.vue";
import Heroes from "@/views/Heroes.vue";
import OrganisationDetail from "@/views/OrganisationDetail.vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        exact: true
      },
      {
        path: 'auth',
        name: 'Auth',
        component: Auth,
      },
      {
        path: 'orgas/detail',
        name: 'OrgaDetails',
        component: OrganisationDetail,
      },
      {
        path: 'orgas',
        name: 'Orgas',
        component: Organisations,
      },
      {
        path: 'teams',
        name: 'Teams',
        component: Teams,
      },
      {
        path: 'heroes',
        name: 'Heroes',
        component: Heroes,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
