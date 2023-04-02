import axios from "axios";
import { store } from "@/main";

const apiClient = axios.create({
  baseURL: "https://apidemo.iut-bm.univ-fcomte.fr/herocorp",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const orgSecret = store.state.orgPassword;
  if (orgSecret) {
    config.headers["org-secret"] = orgSecret;
  }
  return config;
});

export default {
  async get(url) {
    const response = await apiClient.get(url);
    return response.data;
  },
  async post(url, payload) {
    const response = await apiClient.post(url, payload);
    return response.data;
  },
  async put(url, payload) {
    const response = await apiClient.put(url, payload);
    return response.data;
  },
  async patch(url, payload) {
    const response = await apiClient.patch(url, payload);
    return response.data;
  },
  async delete(url) {
    const response = await apiClient.delete(url);
    return response.data;
  },
};
