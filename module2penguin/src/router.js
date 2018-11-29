import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

import { auth } from "@/firebaseConfig";

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('./views/Todos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/todos/:category',
      name: 'todos',
      component: () => import('./views/Todos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('./views/Done.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/done/:category',
      name: 'done',
      component: () => import('./views/Done.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/todo/:id',
      name: 'todo',
      component: () => import('./views/Todo.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('./views/NotFound.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      redirect: '/404',
    }
  ],
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(currentUser, requiresAuth);

  if (requiresAuth && !currentUser) {
   next('/');
  } else {
   next();
  }
});

export default router;
