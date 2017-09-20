<template lang='pug'>
  div.hello
    div(v-if="teams")
      div(v-for="team in teams") 
        router-link(:to="`teams/${team.team_id}`") {{team.name}} - {{team.rating}} - {{team.winRate}}%
</template>

<script>
export default {
  fetch ({ store }) {
    store.dispatch('loadTeams')
  },
  name: 'team-page',
  computed: {
    teams () {
      return this.$store.getters.teams.filter((item, key) => key < 30)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
