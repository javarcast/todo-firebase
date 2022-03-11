import { createRouter, createWebHistory } from 'vue-router'
import { firebase } from '@/utils/firebase';

const routes = [
  {
    path: '/',
    name: 'home',
    component:  () => import(/* webpackChunkName: "Home" */ '../views/HomeView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import(/* webpackChunkName: "Crud" */ '../views/Crud.vue'),
    meta: {
      requiredAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiredAuth = to.matched.some(record => record.meta.requiredAuth);
  if(requiredAuth && !(await firebase.getCurrentUser())) {
    next('/');
  }else{
    next();
  }
})

export default router
