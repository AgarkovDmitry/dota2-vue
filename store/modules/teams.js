import api from '@/api'

const module = {
  state: {
    data: []
  },
  actions: {
    loadTeams ({ commit, state }) {
      if (state.data.length == 0) api.fetchTeams().then(res => commit('loadTeams', res))
    },
  },
  getters: {
    teams: (state) => state.data.sort((a, b) => {
      if (a.rating < b.rating) return 1
      else if (a.rating > b.rating) return -1
      else return 0
    })
  },
  mutations: {
    loadTeams: (state, payload) => state.data.push(
      ...payload
        .map(item =>
          ({ ...item, winRate: ((item.wins) / (item.wins + item.losses) * 100).toFixed(2) })
        )
        .filter(item =>
          item.rating && item.name
        )
    )
  }
}

export default module