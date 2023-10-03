import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://ecoliving-env-1.eba-dgcswt2k.eu-north-1.elasticbeanstalk.com/api/test/";
const API_MAIN = "http://ecoliving-env-1.eba-dgcswt2k.eu-north-1.elasticbeanstalk.com/";
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
