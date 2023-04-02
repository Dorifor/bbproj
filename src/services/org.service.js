import axios from "@/services/axios.service";

export default {
  getAllOrgs() {
    return axios.get("/orgs/get");
  },
  createOrg(data) {
    return axios.post("/orgs/create", data);
  },
  addTeamToOrg(data) {
    return axios.patch("/orgs/addteam", data);
  },
  removeTeamFromOrg(data) {
    return axios.patch("/orgs/removeteam", data);
  },
  getOrgById(id) {
    return axios.get(`/orgs/getbyid/${id}`);
  },
};
