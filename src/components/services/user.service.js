import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://ecoliving-e05afad0acd8.herokuapp.com/api/test/";
const API_MAIN = "https://ecoliving-e05afad0acd8.herokuapp.com/";
// const API_URL = "http://localhost:8090/api/test/";
// const API_MAIN = "http://localhost:8090/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getCustomers = () => {
  return axios.get(API_MAIN + "data/customers", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getCustomers,
};

export default UserService;
