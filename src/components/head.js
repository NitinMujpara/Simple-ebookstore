import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import "./css/head.css";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";
import bookService from "../service/bookService";

function Head() {
  const handleSubmit = async (values) => {
    const payload = {
      keyword: values.keyword,
    };

    await bookService.search(payload).then((response) => {
      console.log("API Response Data:", response.data.result);
      if (response && response.status === 200) {
        toast.success("Book Find Successfully");
      } else {
        toast.error("Not Found");
      }
    });
  };

  const userContext = useAuthContext();
  console.log(userContext.user);

  return (
    <div className="header">
      <div>
        <h2>BookDekho</h2>
        <ul className="menu">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About Us
          </Link>
          {userContext.user.email ? (
            <>
              <Link className="link" to="/books">
                Books
              </Link>
              <Link className="link" to="/blist">
                BookList
              </Link>
              <Link className="link" to="/users">
                Users
              </Link>
              <Link className="link" to="/categories">
                Category
              </Link>
              <Link className="link" to="/updateuser">
                Update Profile
              </Link>
              <Link className="link" to="/cart">
                Cart
              </Link>
              <Link className="link" to="/logout">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="link" to="/login">
                Login
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="global-search">
        <Formik
          initialValues={{ keyword: "" }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <input
                  id="outlined-required"
                  name="keyword"
                  label="search"
                  type="search"
                  value={values.keyword}
                  onChange={(e) => setFieldValue("keyword", e.target.value)}
                />
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  style={{
                    height: "31px",
                    marginLeft: "5px",
                    marginBottom: "3px",
                  }}
                >
                  Search
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Head;
