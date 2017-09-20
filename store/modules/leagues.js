import Vue from 'vue'
import api from '@/api'

const module = {
  state: {},
  actions: {
    loadLeagues: ({ commit }) => api.fetchLeagues().then(res => commit('loadLeagues', res)),
  },
  getters: {
    leagues: (state) => state
  },
  mutations: {
    loadLeagues: (state, payload) => payload.map(item => Vue.set(state, item.leagueid, item))
  }
}

export default module