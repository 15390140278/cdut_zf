import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'ZF_USER'
const TOKEN_KEY_2 = 'ZF_ADMIN'

const store = new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    admin: getItem(TOKEN_KEY_2)
  },
  mutations: {
    setLoginStatus(state, data) {
      state.user = data
      // 持久化到本地存储
      setItem(TOKEN_KEY, data)
    },
    setAdminLoginStatus(state, data) {
      state.admin = data
      // 持久化到本地存储
      setItem(TOKEN_KEY_2, data)
    }
  },
  actions: {},
  modules: {}
})

export default store
