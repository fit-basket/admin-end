let serverBaseUrl = "https://the-purple-mango.onrender.com/api";
let clientBaseUrl = "http://localhost:3000";

if (process.env.REACT_APP_ENVIRONMENT === "dev") {
  serverBaseUrl = "http://localhost:3001/api";
  clientBaseUrl = "http://localhost:3000";
} else if (process.env.REACT_APP_ENVIRONMENT === "prod") {
  serverBaseUrl = "https://the-purple-mango.onrender.com/api";
  clientBaseUrl = "https://thepurplemango.netlify.app";
}

export { serverBaseUrl, clientBaseUrl };
