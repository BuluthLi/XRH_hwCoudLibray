import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodslist',
      component: () => import(/*webpackChunkName:'goodslist' */'../components/goodslist/GoodsList.vue'),
    },
    {
      path: '/other',
      name: 'other',
      component: () => import(/*webpackChunkName:'other' */'../components/other/Other.vue'),
    }
  ]
})
