// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import FastClick from 'fastclick'
// import '@/assets/css/global.css'
import '@/assets/js/iconfont'
import '@/assets/css/iconfont.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueAxios, axios)

Vue.use(VueLodash, lodash)

FastClick.attach(document.body)
Vue.config.productionTip = false

// axios全局设定
// axios.defaults.baseURL = 'http://wapp.ai-well.com'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.interceptors.response.use(function (res) {
//   if (!res.data.code) {
//     return res
//   } else if (res.data.code && res.data.code === 0) {
//     return res
//   } else if (res.data.code && res.data.code !== 0 && res.data.msg) {
//     return res
//   } else {
//     console.log(res)
//   }
// }, function (err) {
//   console.log(err)
//   return Promise.reject(err)
// })

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
