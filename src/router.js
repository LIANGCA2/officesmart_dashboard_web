import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/',
      name: 'main',
      component: () => import(/* webpackChunkName: "main" */ './views/Main.vue'),
      meta: { nav: false },
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import(/* webpackChunkName: "overview" */ './views/Overview.vue'),
          meta: { label: 'MenuLocale.overview.label', iconClass: 'iconfont icon-overview' }
        },
        {
          path: 'data-trace',
          name: 'dataTrace',
          component: Layout,
          meta: { label: 'MenuLocale.dataTrace.label', iconClass: 'iconfont icon-ico_zhuizon' },
          children: [
            {
              path: 'trace-flow-management',
              name: 'traceFlowManagement',
              component: () => import(/* webpackChunkName: "traceFlowManagement" */ './views/data-trace/TraceFlowManagement.vue'),
              meta: { label: 'MenuLocale.dataTrace.traceFlowManagement.label', iconClass: 'iconfont icon-ziliaoneirongguanli_huaban' }
            },
            {
              path: 'tracing',
              name: 'tracing',
              component: () => import(/* webpackChunkName: "tracing" */ './views/data-trace/Tracing.vue'),
              meta: { label: 'MenuLocale.dataTrace.tracing.label', iconClass: 'iconfont icon-zhibiaozhuizong' }
            },
            {
              path: 'monitoring',
              name: 'data-trace-monitoring',
              component: () => import(/* webpackChunkName: "data-trace-monitoring" */ './views/data-trace/Monitoring.vue'),
              meta: { label: 'MenuLocale.dataTrace.monitoring.label', iconClass: 'iconfont icon-zhibiaozhuizong' }
            }
          ]
        }
      ]
    }
  ]
})
