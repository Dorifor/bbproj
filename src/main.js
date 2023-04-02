import App from './App.vue'

import {createApp} from 'vue'
import {createStore} from 'vuex'

// Plugins
import {registerPlugins} from '@/plugins'
import orgService from "@/services/org.service"
import teamService from "@/services/team.service"
import heroService from "@/services/hero.service"

export const store = createStore({
  state() {
    return {
      orgPassword: "pwd",
      heroesList: [],
      teamsList: [],
      orgsList: [],
      currentHero: null,
      currentTeam: null,
      currentOrg: null
    }
  },
  mutations: {
    setOrgPassword(state, newPassword) {
      state.orgPassword = newPassword
    },
    setHeroes(state, heroes) {
      state.heroesList = heroes
    },
    setTeams(state, teams) {
      state.teamsList = teams
    },
    setOrgs(state, orgs) {
      state.orgsList = orgs
    },
    setCurrentHero(state, hero) {
      state.currentHero = hero
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team
    },
    setCurrentOrg(state, org) {
      state.currentOrg = org
    }
  },
  actions: {
    async getAllHeroes({ commit }) {
      commit('setHeroes', (await heroService.getAllHeroes()).data)
    },
    async getAllTeams({ commit }) {
      commit('setTeams', (await teamService.getAllTeams()).data)
    },
    async getAllOrgs({ commit }) {
      commit('setOrgs', (await orgService.getAllOrgs()).data)
    },
    async getOrgById({ commit }, id) {
      try {
        const res = await orgService.getOrgById(id)
        const org = res.error === 0 ? res.data[0] : null
        console.log("org: ", org)
        for (const team of org?.teams) {
          const teamMembers = []
          for (const member of team.members) {
            teamMembers.push((await heroService.getHeroById(member)).data[0]);
          }
          team.members = teamMembers
        }
        commit('setCurrentOrg', org)
      } catch (error) {
        console.error(error)
        commit('setCurrentOrg', null)
      }
    },
    async createOrg({ dispatch }, org) {
      await orgService.createOrg(org)
      dispatch('getAllOrgs')
    },
    async createTeam({ dispatch }, team) {
      await teamService.createTeam(team)
      dispatch('getAllTeams')
    },
    async createHero({ dispatch }, hero) {
      await heroService.createHero(hero)
      dispatch('getAllHeroes')
    },
    async removeTeamFromOrg({ dispatch }, { teamId, orgId }){
      await orgService.removeTeamFromOrg({ idTeam: teamId})
      dispatch('getOrgById', orgId)
    },
    async addTeamToOrg({ dispatch }, { teamId, orgId }){
      await orgService.addTeamToOrg({ idTeam: teamId})
      dispatch('getOrgById', orgId)
    },
    async addHeroesToTeam({ dispatch }, { heroesIds, teamId, orgId }){
      await teamService.addHeroesToTeam({ idHeroes: heroesIds, idTeam: teamId})
      dispatch('getOrgById', orgId)
    },
    async removeHeroesFromTeam({ dispatch }, { heroesIds, teamId, orgId }){
      await teamService.removeHeroesFromTeam({ idHeroes: heroesIds, idTeam: teamId})
      dispatch('getOrgById', orgId)
    },
    async updateHero({ dispatch }, { heroData, orgId }) {
      await heroService.updateHero(heroData)
      dispatch('getOrgById', orgId)
    }
  }
})

const app = createApp(App)
app.use(store)

registerPlugins(app)

app.mount('#app')
