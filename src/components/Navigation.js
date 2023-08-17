import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Booklist from "../components/Booklist";
import NotFound from "../components/NotFound";
import Books from "../components/Books";
import AddBook from "./AddBook";
import Users from "../components/Users";
import Category from "../components/category";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Logout from "./Logout";
import { useAuthContext } from "../context/authContext";
import AddCategory from "./AddCategory";
import UpdateUser from "./UpdateUser";
import Cart from "./Cart";

const Navigation = () => {
  const userContext = useAuthContext();
  // console.log("Data", userContext.user);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            userContext.user.email ? <About /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/books"
          element={
            userContext.user.email ? <Booklist /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/blist"
          element={
            userContext.user.email ? <Books /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/AddBook"
          element={
            userContext.user.email ? <AddBook /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/editBook/:id"
          element={
            userContext.user.email ? <AddBook /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/users"
          element={
            userContext.user.email ? <Users /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/updateuser"
          element={
            userContext.user.email ? <UpdateUser /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/categories"
          element={
            userContext.user.email ? <Category /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/editcat/:id"
          element={
            userContext.user.email ? <AddCategory /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/addcat"
          element={
            userContext.user.email ? <AddCategory /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cart"
          element={userContext.user.email ? <Cart /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Navigation;
