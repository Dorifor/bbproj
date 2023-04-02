<template>
  <h1 class="text-center text-h1">Organisations</h1>
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
          v-model="newOrgName"
          :rules="rules"
          label="Nom"
        ></v-text-field>
        <v-text-field
          v-model="newOrgSecret"
          :rules="rules"
          label="Secret"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="secondary" @click="dialog = false">Annuler</v-btn>
          <v-btn type="submit" color="primary" @click="addOrg()">Ajouter</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-divider></v-divider>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Organisation
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="org in orgsList"
      :key="org._id"
    >
      <td @click="selectOrg(org._id)"><b>{{ org.name }}</b></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import router from "@/router";

export default {
  name: "Orgas",
  data: () => ({
    dialog: false,
    newOrgName: "",
    newOrgSecret: "",
    rules: [
      value => {
        if (value) return true

        return 'Ce champ doit être rempli.'
      },
    ],
  }),
  methods: {
    ...mapActions(['getAllOrgs', 'createOrg', "getOrgById"]),
    addOrg() {
      if (!this.newOrgName || !this.newOrgSecret) return
      this.createOrg({name: this.newOrgName, secret: this.newOrgSecret})
      this.dialog = false
    },
    async selectOrg(orgId) {
      await this.getOrgById(orgId)
      router.push('orgas/detail')
    }
  },
  computed: {
    ...mapState(['orgsList', "currentOrg"])
  },
  created() {
    this.getAllOrgs()
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
