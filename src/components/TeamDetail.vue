<template>
  <v-dialog
    v-model="dialogs.error"
    width="400px"
  >

  <v-dialog
    v-model="dialogs.teamDelete"
    width="400px"
  >
    <v-card>
      <v-card-text>Voulez vous vraiment supprimer l'équipe {{ selectedTeam.name }}?</v-card-text>
      <v-card-actions class="float-right">
        <v-btn color="secondary" @click="dialogs.teamDelete = false">Retour</v-btn>
        <v-btn color="error" variant="tonal" @click="removeTeam">Supprimer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialogs.teamAdd"
    width="600px"
  >
    <v-card>
      <v-autocomplete
        v-model="selectedTeam"
        hint="Choisir Equipe"
        :items="teamsList"
        item-title="name"
        item-value="_id"
        label="Equipe"
      ></v-autocomplete>
      <v-card-actions>
        <v-btn color="secondary" @click="dialogs.teamAdd = false">Annuler</v-btn>
        <v-btn color="error" variant="tonal" @click="addTeam">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--   PAGE   -->

  <h1 class="text-center text-h1">Team - {{ currentTeam?.name ?? "Erreur" }}</h1>
  <v-divider></v-divider>
  <p><b>Secret: </b>{{ currentOrg?.secret }}</p>
  <v-btn
    color="primary"
    @click="displayAddPopup"
  >
    Ajouter
  </v-btn>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Team
      </th>
      <th class="text-left">
        Actions
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="team in currentOrg?.teams"
      :key="team._id"
    >
      <td><b>{{ team.name }}</b></td>
      <td>
        <v-btn icon="mdi-pencil" color="primary" size="small" class="mr-2"></v-btn>
        <v-btn icon="mdi-delete" color="error" size="small" @click="displayDeletePopup(team)"></v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import router from "@/router";

export default {
  name: "OrgaDetail",
  data: () => ({
    dialogs: {
      error: false,
      teamDelete: false,
      teamAdd: false
    },
    newTeamName: "",
    selectedTeam: {},
    rules: [
      value => {
        if (value) return true

        return 'Ce champ doit être rempli.'
      },
    ],
  }),
  methods: {
    ...mapActions(['createOrg', 'getOrgById', 'removeTeamFromOrg', 'addTeamToOrg']),
    returnToOrgasList() {
      router.push('/orgas')
    },
    selectTeam(team) {
      console.log("team: ", team._id)
    },
    displayDeletePopup(team) {
      this.dialogs.teamDelete = true
      this.selectedTeam = team
      console.log("current org: ", this.currentOrg)
    },
    removeTeam() {
      this.removeTeamFromOrg({teamId: this.selectedTeam._id, orgId: this.currentOrg._id})
      this.dialogs.teamDelete = false
    },
    displayAddPopup() {
      this.getAllTeams()
      this.selectedTeam = "Choisir Equipe"
      this.dialogs.teamAdd = true
    },
    addTeam() {
      this.addTeamToOrg({teamId: this.selectedTeam, orgId: this.currentOrg._id})
      this.dialogs.teamAdd = false
    }
  },
  computed: {
    ...mapState(["currentTeam", "heroesList"])
  },
  created() {
    this.dialogs.error = !this.currentOrg
  }
}
</script>

<style>
tbody tr {
  transition: all .2s !important;
}

tbody tr:hover {
  background: lightsteelblue;
  transition: all .2s !important;
}
</style>
