import api from '~/api'
import getHeroPickRate from '~/utils/getHeroPickRate'

const module = {
  state: {
    data: []
  },
  actions: {
    loadHeroes ({ commit, state }) {
      if (state.data.length == 0) api.fetchHeroesStats().then(res => commit('loadHeroes', res))
    },
  },
  getters: {
    heroes: (state) => state.data,
    hero: state => id => state.data.find(item => item.id == id),
    heroesStat: (state, getters) => ({ team, matches }) => {
      const singleHeroStats = state.data
        .map(hero => getHeroPickRate(matches, [hero.id], team))
        .filter(item => item.picks > 0)
        .map(item => ({ ...item, hero: getters.hero(item.heroes[0]) }))

      const pairHeroStats = singleHeroStats
        .map((singleHero, index) =>
          singleHeroStats
            .filter((item, key) => key > index)
            .map(hero =>
              getHeroPickRate(getters.mmatches({ matches: singleHero.matches }), [...singleHero.heroes, ...hero.heroes], team)
            )
            .filter(item => item.picks > 0)
        )
        .filter(item => item.length)
        .reduce((a, b) => [...a, ...b], [])
      
      return {
        singleHeroStats,
        pairHeroStats
      }
    }
  },
  mutations: {
    loadHeroes: (state, payload) => state.data.push(
      ...payload
    )
  }
}

export default module