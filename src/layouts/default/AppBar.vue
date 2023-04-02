<template>
  <v-app-bar :elevation="5">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Heroes & Vilains</v-app-bar-title>
    <template v-slot:append>
      <v-btn append-icon="mdi-account" to="/auth" router rounded>{{ orgPassword }}</v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="left"
    permanent
  >
    <v-list>
      <v-list-item v-for="link in links" :key="link.id" :to="link.route" router exact>
          <v-list-item-title><v-icon>{{ link.icon }}</v-icon> {{ link.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          id: 0,
          title: 'Accueil',
          icon: 'mdi-home',
          route: '/'
        },
        {
          id: 1,
          title: 'Organisations',
          icon: 'mdi-account-network',
          route: '/orgas'
        },
        {
          id: 2,
          title: 'Equipes',
          icon: 'mdi-account-multiple',
          route: '/teams'
        },
        {
          id: 3,
          title: 'Heros',
          icon: 'mdi-account-card',
          route: '/heroes'
        }
      ]
    }
  },
  computed: {
    ...mapState(['orgPassword'])
  }
}
</script>
