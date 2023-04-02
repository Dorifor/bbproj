<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent>
          <v-text-field
            v-model="orgPassword"
            :rules="rules"
            label="Mot de passe"
          ></v-text-field>
          <v-btn type="submit" @click="submit" block class="mt-2">Enregistrer</v-btn>
        </v-form>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import router from "@/router";

export default {
  name: "Auth",
  data: () => ({
    orgPassword: "",
    rules: [
      value => {
        if (value) return true

        return 'Vous devez rentrer un mot de passe valide.'
      },
    ],
  }),
  methods: {
    ...mapMutations(['setOrgPassword']),
    async submit() {
      this.setOrgPassword(this.orgPassword)
      router.go(-1)
    }
  }
}
</script>
