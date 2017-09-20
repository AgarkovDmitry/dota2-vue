<template lang='pug'>
  div(v-if="chartData")
    svg(width='800' height='600')
      g#allLink
      g#allNode
      defs#allPattern
</template>

<script>
import createHeroChart from '~/utils/createChart'

export default {
  name: 'hero-chart',
  computed: {
    chartData () {
      const { singleHeroStats, pairHeroStats } = this.$store.getters.heroesStat({ team: this.$route.params.id, matches: this.$attrs.matches })

      const nodes = singleHeroStats.map(item => ({
        label: `${item.hero.localized_name}`,
        r: item.picks > 20 ? 25 : 25 + 0.5 * item.picks,
        color: item.winRate > 0.5 ? 'green' : 'red',
        id: item.heroes[0],
        src: `https://api.opendota.com${item.hero.icon}`,
        width: item.heroes[0] == this.$attrs.selectedHero ? 4 : 3,
        array: item.heroes[0] == this.$attrs.selectedHero ? (item.picks > 20 ? 25 : 25 + 0.5 * item.picks) * Math.PI / 8 : 0,
        offset: item.heroes[0] == this.$attrs.selectedHero ? (item.picks > 20 ? 25 : 25 + 0.5 * item.picks) * Math.PI : 0,
        class: item.heroes[0] == this.$attrs.selectedHero ? 'selected' : '',
        opacity: 1,
        onClick: () => this.$attrs.selectHero(item.heroes[0])
      }))

      const links = pairHeroStats.filter(item => item.picks > 1).map(item => ({
        id: `${item.heroes[0]} - ${item.heroes[1]}`,
        source: nodes.findIndex(node => node.id == item.heroes[0]),
        target: nodes.findIndex(node => node.id == item.heroes[1]),
        color: item.winRate > 0.5 ? 'green' : 'red',
        width: 3,
        opacity: item.picks * 0.1,
        label: `${item.winRate * 100}% - ${item.picks} picks`
      }))
      
      return { nodes, links }
    },
  },
  mounted () {
    createHeroChart(this.chartData.nodes, this.chartData.links, this.$attrs.selectedHero)
  },
  updated () {
    createHeroChart(this.chartData.nodes, this.chartData.links, this.$attrs.selectedHero)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.selected{
  stroke-width: 4;
  stroke-linecap: round;
  animation: dash 4s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

</style>
