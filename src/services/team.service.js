import axios from "@/services/axios.service";

export default {
  getAllTeams() {
    return axios.get("/teams/get");
  },
  createTeam(data) {
    return axios.post("/teams/create", data);
  },
  addHeroesToTeam(data) {
    return axios.patch("/teams/addheroes", data);
  },
  removeHeroesFromTeam(data) {
    return axios.patch("/teams/removeheroes", data);
  },
};
