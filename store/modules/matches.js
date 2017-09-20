import Vue from 'vue'
import api from '@/api'

const module = {
  state: {
    data: []
  },
  actions: {
    async loadMatchesWithExtras ({ dispatch, getters }, { count, fromStart, filters } = { count: 5, fromStart: true, filters: {} }) {
      await dispatch('loadMatches', { count, fromStart })
      const ids = getters.mmatches(filters).map(match => match.match_id)
      dispatch('loadMatchesExtra', { ids })
    },
    async loadMatches ({ commit, state }, { count, fromStart } = { count: 5, fromStart: true }) {
      const matchesCount = state.data.length
      const resCount = fromStart ? count - matchesCount / 100 : count

      let res = []
      for (let i = 0; i < resCount; i++) {
        let tempRes = await api.fetchProMatches(
          res.length > 0
            ? res[res.length - 1].match_id
            : matchesCount > 0
              ? state.data[matchesCount - 1].match_id
              : undefined
        )
        res = [...res, ...tempRes]
      }
      
      commit('loadMatches', res)
    },
    async loadMatchExtra ({ commit, state }, { id }) {
      const matches = state.data.filter((item) => item.match_id == id && !item.isFetched)
      const promises = matches.map(({ match_id }) => api.fetchMatchInfo(match_id))
      const res = await Promise.all(promises)

      commit('loadMatchesExtra', res)
    },
    async loadMatchesExtra ({ commit, state }, { ids }) {
      const matches = state.data.filter(({ match_id, isFetched }) => ids.includes(match_id) && !isFetched)
      const promises = matches.map(({ match_id }) => api.fetchMatchInfo(match_id))
      const res = await Promise.all(promises)
      commit('loadMatchesExtra', res)
    }
  },
  getters: {
    matches: state => state.data,

    mmatches: state => ({ league, team, side, rival, duration, matches, heroes, isFetched } = {}) => {
      let data = state.data

      if (isFetched) data = data.filter(item => item.isFetched == isFetched)

      if (league) data = data.filter(item => item.leagueid == league)

      if (team) {
        if (side) data = data.filter(item => item[side] == team)
        else data = data.filter(item => item.radiant_team_id == team || item.dire_team_id == team)

        if (rival) data = data.filter(item => item.radiant_team_id == rival || item.dire_team_id == rival)
      }

      if (duration) data = data.filter(item => item.duration >= duration.min && item.duration < duration.max)

      if (matches) data = data.filter(match => matches.reduce((res, item) => res || match.match_id == item, false))

      if (heroes) {
        data = data.filter(item => {
          const radiantPicks = item.picks_bans.filter(item => item.team == 0 && item.is_pick == true)
          const direPicks = item.picks_bans.filter(item => item.team == 1 && item.is_pick == true)

          const werePickedByRadiant = heroes.reduce(
            (result, hero) => result && radiantPicks.reduce((a, b) => a || b.hero_id == hero, false),
            true
          )
          const werePickedByDire = heroes.reduce(
            (result, hero) => result && direPicks.reduce((a, b) => a || b.hero_id == hero, false),
            true
          )

          return werePickedByRadiant || werePickedByDire
        })
      }

      return data
    }
  },
  mutations: {
    loadMatches (state, payload) {
      payload.map(item => state.data.push(item))
    },
    loadMatchesExtra (state, payload) {
      payload.map(match => {
        const index = state.data.findIndex((item) => item.match_id == match.match_id)
        Vue.set(state.data, index, { ...state.data[index], ...match, isFetched: true })
      })
    }
  }
}

export default module