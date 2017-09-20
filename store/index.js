import Vue from 'vue'
import Vuex from 'vuex'
import players from './modules/players'
import teams from './modules/teams'
import leagues from './modules/leagues'
import heroes from './modules/heroes'
import matches from './modules/matches'

Vue.use(Vuex)

export default () => new Vuex.Store({
  modules: {
    players,
    teams,
    leagues,
    heroes,
    matches
  }
})