<template>
  <h1 class="text-center text-h1">Equipes</h1>
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

    <v-card>
      <v-form @submit.prevent>
        <v-text-field
          v-model="newTeamName"
          :rules="rules"
          label="Nom"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="secondary" @click="dialog = false">Annuler</v-btn>
          <v-btn type="submit" color="primary" @click="addTeam()">Ajouter</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-divider></v-divider>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Equipe
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="team in teamsList"
      :key="team._id"
    >
      <td><b>{{ team.name }}</b></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "Teams",
  data: () => ({
    dialog: false,
    newTeamName: "",
    rules: [
      value => {
        if (value) return true

        return 'Ce champ doit être rempli.'
      },
    ],
  }),
  methods: {
    ...mapActions(['getAllTeams', 'createTeam']),
    addTeam() {
      if (!this.newTeamName) return
      this.createTeam({name: this.newTeamName})
      this.dialog = false
    }
  },
  computed: {
    ...mapState(['teamsList', "currentTeam"])
  },
  created() {
    this.getAllTeams()
  }
}
</script>
