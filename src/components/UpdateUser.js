import React from "react";
import Head from "./head";
import Footer from "./Footer";
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
import "./css/User.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const initialValues = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
  };

  const navigate = useNavigate();
  const [initialValuesState, setInitialValueState] = useState(initialValues);
  const userContext = useAuthContext();
  //   console.log(userContext.user);
  useEffect(() => {
    // Update the initial values when userContext.user changes
    setInitialValueState(userContext.user);
  }, [userContext.user]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Username should not be empty"),
    email: Yup.string().required("Email should not be empty"),
    age: Yup.number().min(18),
    password: Yup.string().required("Password should not be empty"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      id: values.id,
      firstName: values.firstName,
      lastName: "test",
      email: values.email,
      roleId: 2,
      role: values.role,
      password: values.password,
    };

    await authService.update(payload).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast.success(
          values.id
            ? "Record updated successfully"
            : "Record created successfully"
        );
        navigate("/");
      } else {
        toast.error("Unable to Register");
      }
    });
  };

  return (
    <div className="page">
      <Head />
      <div>
        <div className="updateuser">
          <AccessibilityNewIcon sx={{ fontSize: 50, color: "white" }} />
          <h2>Welcome User</h2>
          <Formik
            initialValues={initialValuesState}
            validationSchema={validationSchema}
            enableReinitialize={true}
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
              console.log(errors, values);
              return (
                <Form>
                  <Box sx={logincontainer}>
                    <Box sx={loginbox}>
                      <TextField
                        id="outlined-required"
                        name="firstName"
                        label="firstName"
                        error={!!errors.firstName}
                        value={values.firstName}
                        onChange={(e) =>
                          setFieldValue("firstName", e.target.value)
                        }
                        sx={{ width: "90%" }}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="firstName" />
                      </FormHelperText>
                      <br />
                      <br />

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
                        <ErrorMessage name="email" />
                      </FormHelperText>
                      <br />
                      <br />

                      <TextField
                        id="outlined-required"
                        name="role"
                        label="role"
                        error={!!errors.role}
                        value={values.role}
                        onChange={(e) => setFieldValue("role", e.target.value)}
                        sx={{ width: "90%" }}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="role" />
                      </FormHelperText>
                      <br />
                      <br />

                      <TextField
                        id="outlined-password-input"
                        name="password"
                        label="Password"
                        error={!!errors.password}
                        value={values.password}
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                        type="password"
                        autoComplete="current-password"
                        sx={{ width: "90%" }}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="password" />
                      </FormHelperText>
                      <br />
                      <br />

                      <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        sx={lgbtn}
                      >
                        Update User
                      </Button>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateUser;
