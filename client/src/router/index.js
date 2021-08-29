import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    meta: { requiresAuth: true },
    component: () => import('../views/Chat.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ name: 'Auth' });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    if (store.getters.isLoggedIn) {
      next('/Chat');
    }
    next(); 
  }
});


export default router;
