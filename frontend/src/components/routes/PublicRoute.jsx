import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ element: Element, restricted, ...props }) => {
  //   const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser && restricted) {
    return <Navigate to="/" />; // Render nothing while the navigation occurs
  }

  return <Element {...props} />;
};

export { PublicRoute };
