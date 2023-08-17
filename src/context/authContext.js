import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUserValue = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  roleId: 0,
  role: "",
  password: "",
};

const initialState = {
  setUser: () => {},
  user: initialUserValue,
  signOut: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserValue);

  const setUser = (data) => {
    // console.log("Setting user data:", data);
    setUserData(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const signOut = () => {
    setUserData(initialUserValue);
    localStorage.removeItem("userInfo");

    navigate("/");
  };

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("userInfo")) || initialUserValue;

    if (!data.email) {
      navigate("/");
    }
    setUserData(data);
  }, []);

  // console.log("data", userData);

  let value = {
    user: userData,
    setUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
