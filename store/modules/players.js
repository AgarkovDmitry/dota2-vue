import api from '@/api'

const module = {
  state: {
    data: []
  },
  actions: {
    loadProPlayers ({ commit, state }) {
      if (state.data.length == 0) api.fetchProPlayers().then(res => commit('loadProPlayers', res))
    },
  },
  getters: {
    players: (state) => state.data
  },
  mutations: {
    loadProPlayers: (state, payload) => state.data.push(
      ...payload
    )
  }
}

export default module