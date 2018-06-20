import Vue from 'vue'
import Vuex from 'vuex'
import tryPayInfo from '@/store/tryPayInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tryPayInfo
  }
})
