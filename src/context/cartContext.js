import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../service/cartService";
import { useAuthContext } from "./authContext";

const initialState = {
  cartData: [],
  updateCart: () => {},
  emptycart: () => {},
};

export const CartContext = createContext(initialState);

export const CartWrapper = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const authContext = useAuthContext();

  useEffect(() => {
    if (authContext.user.id) {
      updateCart();
    }
  }, [authContext]);

  const updateCart = () => {
    cartService
      .getList(authContext.user.id)
      .then((response) => setCartData(response.data.result));
  };

  const emptycart = () => {
    setCartData([]);
  };

  console.log("cartData", cartData);
  let value = { cartData, updateCart, emptycart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
