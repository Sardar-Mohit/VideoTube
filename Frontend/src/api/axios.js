import axios from "axios";

const api = axios.create({
  baseURL: "https://videotube-dawh.onrender.com/api/v1",
  withCredentials: true,
});

export default api;