<template>
  <h1 class="text-center text-h1">Heros</h1>
  <v-divider></v-divider>
  <v-dialog
    v-model="dialog"
    width="600px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
        class="ma-4"
      >
        Ajouter
      </v-btn>
    </template>

    <v-card
      class="pa-4">
      <v-form @submit.prevent>
        <v-text-field
          v-model="newHero.publicName"
          :rules="rules"
          label="Nom publique"
        ></v-text-field>
        <v-text-field
          v-model="newHero.realName"
          :rules="rules"
          label="Nom réel"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="secondary" @click="dialog = false">Annuler</v-btn>
          <v-btn type="submit" color="primary" variant="tonal" @click="addHero()">Ajouter</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Hero
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="hero in heroesList"
      :key="hero._id"
    >
      <td><b>{{ hero.publicName }}</b></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Heroes",
  data: () => ({
    dialog: false,
    newHero: {
      publicName: "",
      realName: ""
    },
    rules: [
      value => {
        if (value) return true

        return 'Ce champ doit être rempli.'
      },
    ],
  }),
  methods: {
    ...mapActions(['getAllHeroes', 'createHero']),
    editHero(hero) {
      console.log(hero)
    },
    addHero() {
      if (!this.newHero.publicName || !this.newHero.realName) return
      this.createHero(this.newHero)
      this.dialog = false
    }
  },
  computed: {
    ...mapState(['heroesList'])
  },
  created() {
    this.getAllHeroes()
  }
}
</script>

<style scoped>
tr > td:first-of-type {
  transition: all .2s !important;
}

tr > td:first-of-type:hover {
  cursor: pointer;
  background: lightsteelblue;
  transition: all .2s !important;
}
</style>
