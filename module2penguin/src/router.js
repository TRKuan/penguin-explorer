import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Map from '@/views/Map.vue'
import Place from '@/views/Place.vue'
import Profile from '@/views/Profile.vue'
import City from '@/views/City.vue'
import Wishlist from '@/views/Wishlist.vue'
import NotFound from '@/views/NotFound.vue'



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
      path: '/map',
      name: 'map',
      component: Map,
      meta: { requiresAuth: true }
    },
    {
      path: '/place/:id',
      name: 'place',
      component: Place,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/:city',
      name: 'city',
      component: City,
      meta: { requiresAuth: true }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist,
      meta: { requiresAuth: true }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/Map.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      redirect: '/404',
    }
  ],
  mode: 'history'
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
