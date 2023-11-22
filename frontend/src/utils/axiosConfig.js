// axiosConfig.js
import axios from "axios";
import { serverBaseUrl } from "./base";

const instance = axios.create({
  baseURL: serverBaseUrl,
});

export default instance;
