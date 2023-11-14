let baseUrl;

if (process.env.REACT_APP_ENVIRONMENT === "dev") {
  baseUrl = "http://localhost:3001/api";
} else if (process.env.REACT_APP_ENVIRONMENT === "prod") {
  baseUrl = "https://the-purple-mango.onrender.com/api";
}

export default baseUrl;
