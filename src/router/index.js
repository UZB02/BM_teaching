import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import AuthLayout from "../layouts/AuthLayout.vue"
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/questions',
      name: 'Questions',
      component: () => import('../views/AdminQuestionsView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/questions/add',
      name: 'Add Questions',
      component: () => import('../views/AddQuestion.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/questions/edit/:slug',
      name: 'Edit Questions',
      component: () => import('../views/EditQuestionView.vue'),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Auth/LoginView.vue'),
      meta:{
        layout: AuthLayout
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Auth/RegisterView.vue'),
      meta:{
        layout: AuthLayout
      }
    },
  ],
})

export default router
