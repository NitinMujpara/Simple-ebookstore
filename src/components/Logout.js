import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Logout = () => {
  const userContext = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    userContext.signOut();
    navigate("/");
  }, [userContext, navigate]);

  return <div>Logging Out And redirecting to Home page</div>;
};

export default Logout;
