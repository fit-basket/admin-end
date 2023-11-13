import { Routes, Route } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./components/routes";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Reviews from "./pages/reviews";
import Error from "./pages/error";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute element={Dashboard} />} />
          <Route
            path="products"
            element={<PrivateRoute element={Products} />}
          />
          <Route path="reviews" element={<PrivateRoute element={Reviews} />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route
          path="login"
          element={<PublicRoute element={Login} restricted={true} />}
        />
        <Route
          path="signup"
          element={<PublicRoute element={Signup} restricted={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
