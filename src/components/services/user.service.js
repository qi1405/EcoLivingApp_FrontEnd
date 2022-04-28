import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "https://backend-jpapp.herokuapp.com/api/test/";
const API_MAIN = "https://backend-jpapp.herokuapp.com/";


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
  return axios.get(API_MAIN + "customers", { headers: authHeader() });
};


const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getCustomers,
};

export default UserService;
