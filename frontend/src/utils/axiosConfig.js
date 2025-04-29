// axiosConfig.js
import axios from "axios";
import { serverBaseUrl } from "./base";

const axiosConfig = axios.create({
  baseURL: serverBaseUrl,
});

export default axiosConfig;
