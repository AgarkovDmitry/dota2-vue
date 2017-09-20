<template lang='pug'>
  div.hello
    router-link(to='/teams') To all teams
    div(v-if='team')
      h1 {{team.name}}({{team.winRate}}%)
    hero-chart(:matches='matches' :selectedHero='data.selectedHero' :selectHero='selectHero')
</template>

<script>
import Vue from 'vue'
import heroChart from '~/components/hero-chart'

let data = new Vue({
  data: {
    selectedHero: 0
  }
})

export default {
  name: 'team-page',
  components: {
    heroChart
  },
  fetch ({ store, params }) {
    store.dispatch('loadProPlayers')
    store.dispatch('loadMatchesWithExtras', { count: 5, fromStart: true, filters: { team: params.id } })
    store.dispatch('loadTeams')
    store.dispatch('loadHeroes')

    Vue.set(data, 'selectedHero', 0)
  },
  methods: {
    selectHero (id) {
      this.$set(data, 'selectedHero', data.selectedHero == id ? 0 : id)
    }
  },
  computed: {
    data () {
      return data
    },
    team () {
      return this.$store.getters.teams.find(item => item.team_id == this.$route.params.id)
    },
    matches () {
      return this.$store.getters.mmatches({
        team: this.$route.params.id,
        isFetched: true,
        heroes: data.selectedHero ? [data.selectedHero] : undefined
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
