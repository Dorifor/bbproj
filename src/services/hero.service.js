import axios from "@/services/axios.service";

export default {
  getAllHeroes() {
    return axios.get("/heroes/getaliases");
  },
  createHero(data) {
    return axios.post("/heroes/create", data);
  },
  updateHero(data) {
    return axios.put("/heroes/update", data);
  },
  getHeroById(id) {
    return axios.get(`/heroes/getbyid/${id}`);
  },
};
