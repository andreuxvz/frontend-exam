import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/auth/login/login.vue'),
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import(/* webpackChunkName: "login" */ './views/modules/exchange/exchange.vue'),
    },
  ],
});
