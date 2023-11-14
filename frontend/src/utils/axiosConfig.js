// axiosConfig.js
import axios from "axios";
import baseUrl from "./base";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
