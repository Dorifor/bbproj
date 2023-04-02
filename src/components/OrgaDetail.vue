<template>
  <!--  DIALOGS  -->
  <!--  Error  -->
  <v-dialog
    v-model="dialogs.error"
    width="400px"
  >
    <v-card>
      <v-card-text>Affichage impossible.</v-card-text>
      <v-card-actions>
        <v-btn color="Primary" block @click="returnToOrgasList">Retour</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--  Remove Team  -->
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

  <!--  Edit Hero  -->
  <v-dialog
    v-model="dialogs.heroUpdate"
    width="600px"
  >
    <v-card
      class="pa-4">
      <v-form @submit.prevent>
        <v-text-field
          v-model="selectedHero.publicName"
          :rules="rules"
          label="Nom publique"
        ></v-text-field>
        <v-text-field
          v-model="selectedHero.realName"
          :rules="rules"
          label="Nom réel"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="secondary" @click="dialogs.heroUpdate = false">Annuler</v-btn>
          <v-btn type="submit" color="primary" variant="tonal" @click="updateHeroData">Modifier</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <!--  Add Team  -->
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

  <!--  Add Hero To Team  -->
  <v-dialog
    v-model="dialogs.heroAdd"
    width="600px"
  >
    <v-card>
      <v-autocomplete
        v-model="selectedHero"
        hint="Choisir Hero"
        :items="heroesList"
        item-title="publicName"
        item-value="_id"
        label="Hero"
      ></v-autocomplete>
      <v-card-actions>
        <v-btn color="secondary" @click="dialogs.heroAdd = false">Annuler</v-btn>
        <v-btn color="error" variant="tonal" @click="addHero">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--  Remove Hero From Team  -->
  <v-dialog
    v-model="dialogs.heroDelete"
    width="400px"
  >
    <v-card>
      <v-card-text>Voulez vous vraiment retirer le héro <b>{{ selectedHero.publicName }}</b> de l'équipe
        <b>{{ selectedTeam.name }}</b> ?
      </v-card-text>
      <v-card-actions class="float-right">
        <v-btn color="secondary" @click="dialogs.heroDelete = false">Retour</v-btn>
        <v-btn color="error" variant="tonal" @click="removeHero">Supprimer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--   PAGE   -->
  <v-sheet class="ma-4">

    <h1 class="text-center text-h1">Organisation - {{ currentOrg?.name ?? "Erreur" }}</h1>
    <v-divider></v-divider>
    <p><b>Secret: </b>{{ currentOrg?.secret }}</p>
    <v-btn
      color="primary"
      @click="displayAddTeamPopup"
    >
      Ajouter Equipe
    </v-btn>

    <v-sheet class="d-flex mt-4">
      <v-card v-for="team in currentOrg?.teams" :key="team?._id" :title="team?.name" variant="outlined" class="w-25">
        <v-list>
          <v-list-item
            v-for="member in team.members" :key="member._id"
            :title="member.publicName + ' (' + member.realName + ')'"
            variant="tonal">
            <template v-slot:append>
              <v-list-item-action>
                <v-btn icon="mdi-pencil" color="primary" size="small" @click="displayUpdateHeroPopup(member)" class="mr-2" variant="plain"></v-btn>
                <v-btn icon="mdi-delete" color="error" size="small" @click="displayRemoveHeroPopup(member, team)"
                       variant="plain"></v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn icon="mdi-account-plus" color="ternary" @click="displayAddHeroPopup(team)" size="small"
                 class="mr-2"></v-btn>
          <v-btn icon="mdi-delete" color="error" size="small" @click="displayDeleteTeamPopup(team)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-sheet>
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
      teamAdd: false,
      heroDelete: false,
      heroAdd: false,
      heroUpdate: false
    },
    newTeamName: "",
    selectedTeam: {},
    selectedHero: {},
    rules: [
      value => {
        if (value) return true

        return 'Ce champ doit être rempli.'
      },
    ],
  }),
  methods: {
    ...mapActions(['getAllOrgs', "getAllHeroes", "updateHero", 'removeHeroesFromTeam', 'addHeroesToTeam', 'getAllTeams', 'createOrg', 'getOrgById', 'removeTeamFromOrg', 'addTeamToOrg']),
    returnToOrgasList() {
      router.push('/orgas')
    },
    selectTeam(team) {
      console.log("team: ", team._id)
    },
    displayDeleteTeamPopup(team) {
      this.dialogs.teamDelete = true
      this.selectedTeam = team
      console.log("current org: ", this.currentOrg)
    },
    displayRemoveHeroPopup(member, team) {
      this.dialogs.heroDelete = true
      this.selectedTeam = team
      this.selectedHero = member
    },
    displayAddTeamPopup() {
      this.getAllTeams()
      this.selectedTeam = "Choisir Equipe"
      this.dialogs.teamAdd = true
    },
    displayAddHeroPopup(team) {
      this.getAllHeroes()
      this.selectedTeam = team
      this.selectedHero = ""
      this.dialogs.heroAdd = true
    },
    displayUpdateHeroPopup(hero) {
      this.selectedHero = {...hero}
      this.dialogs.heroUpdate = true
    },
    removeTeam() {
      this.removeTeamFromOrg({teamId: this.selectedTeam._id, orgId: this.currentOrg._id})
      this.dialogs.teamDelete = false
    },
    removeHero() {
      this.removeHeroesFromTeam({
        heroesIds: [this.selectedHero],
        teamId: this.selectedTeam._id,
        orgId: this.currentOrg._id
      })
      this.dialogs.heroDelete = false
    },
    addTeam() {
      this.addTeamToOrg({teamId: this.selectedTeam, orgId: this.currentOrg._id})
      this.dialogs.teamAdd = false
    },
    addHero() {
      this.addHeroesToTeam({heroesIds: [this.selectedHero], teamId: this.selectedTeam._id, orgId: this.currentOrg._id})
      this.dialogs.heroAdd = false
    },
    updateHeroData() {
      this.updateHero({heroData: this.selectedHero, orgId: this.currentOrg._id})
      this.dialogs.heroUpdate = false
    }
  },
  computed: {
    ...mapState(["currentOrg", "teamsList", "heroesList"])
  },
  created() {
    this.dialogs.error = !this.currentOrg
  }
}
</script>
