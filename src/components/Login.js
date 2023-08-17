import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import authService from "../service/authService";
import { toast } from "react-toastify";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { loginbox, logincontainer, lgbtn } from "../style/commonStyle";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { useAuthContext } from "../context/authContext";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const userContext = useAuthContext();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
    password: Yup.string().min(8).required("password is required"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    await authService
      .Login(payload)
      .then((response) => {
        // console.log("API Response Data:", response.data.result);
        if (response && response.status === 200) {
          toast.success("Login Successfully");
          navigate("/");
          Cookies.set("auth_email", values.email);
          userContext.setUser(response.data.result);
        }
      })
      .catch((error) => {
        toast.error("Unable to Login", error);
      });
  };

  return (
    <div className="page">
      <AccessibilityNewIcon sx={{ fontSize: 50, color: "white" }} />
      <br />
      <h2>Welcome User</h2>
      <Box sx={logincontainer}>
        <Box sx={loginbox}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              }
              return errors;
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ values, errors, setFieldValue }) => {
              return (
                <Form>
                  <TextField
                    id="outlined-required"
                    name="email"
                    label="Email"
                    error={!!errors.email}
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    sx={{ width: "90%" }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="email" component="div" />
                  </FormHelperText>
                  <br />
                  <br />

                  <TextField
                    id="outlined-password-input"
                    name="password"
                    label="Password"
                    error={!!errors.password}
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    sx={{ width: "90%" }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="password" component="div" />
                  </FormHelperText>
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    sx={lgbtn}
                  >
                    Login
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <div className="lglinks">
          <h4 className="for">Forgot your password?</h4>
          <h4 className="reg">Don't have an account? Get Started</h4>
        </div>
      </Box>
    </div>
  );
}

export default Login;
