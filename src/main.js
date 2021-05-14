import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element'
import './assets/css/global.css'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8080'
})

Vue.prototype.qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
