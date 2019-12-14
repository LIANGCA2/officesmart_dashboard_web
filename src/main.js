import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/base.css'
import './assets/styles/element-variables.scss'
import VueScroll from 'vuescroll'
import FullScreen from 'vue-fullscreen'
import i18n from './i18n'
import api from './api'
import './plugins/http'
import VueProgressBar from 'vue-progressbar'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

Vue.config.productionTip = false
const moment = extendMoment(Moment)
const dateFormat = 'YYYY/MM/DD HH:mm:ss'
moment.prototype.defaultFormat = function () { return this.format(dateFormat) }
Vue.prototype.$moment = moment
Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(VueScroll)
Vue.use(FullScreen)
Vue.use(VueProgressBar, {
  color: '#006BB7',
  failedColor: '#DC3545',
  height: '3px',
  transition: {
    speed: '1.5s',
    opacity: '0.6s',
    termination: 400
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
