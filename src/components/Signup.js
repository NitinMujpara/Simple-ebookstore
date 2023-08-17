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

function Signup() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username should not be empty"),
    email: Yup.string().required("Email should not be empty"),
    age: Yup.number().min(18),
    password: Yup.string().required("Password should not be empty"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      firstName: values.username,
      lastName: "test",
      email: values.email,
      roleId: 2,
      password: values.password,
    };

    await authService.Register(payload).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast.success("Registered Successfully");
      } else {
        toast.error("Unable to Register");
      }
    });
  };

  return (
    <div className="page">
      <AccessibilityNewIcon sx={{ fontSize: 50, color: "white" }} />
      <h2>Welcome User</h2>
      <Formik
        initialValues={{ username: "", email: "", age: "", password: "" }}
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
        {({ values, errors, setFieldValue, handleBlur }) => {
          console.log(errors, values);
          return (
            <Form>
              <Box sx={logincontainer}>
                <Box sx={loginbox}>
                  <TextField
                    id="outlined-required"
                    name="username"
                    label="Username"
                    error={!!errors.username}
                    value={values.username}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    onBlur={handleBlur}
                    sx={{ width: "90%" }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="username" />
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
                    name="age"
                    label="Age"
                    error={!!errors.age}
                    value={values.age}
                    onChange={(e) => setFieldValue("age", e.target.value)}
                    sx={{ width: "90%" }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="age" />
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
                    Register
                  </Button>
                </Box>
                <div className="lglinks">
                  <h4 className="for">Forgot your password?</h4>
                  <h4 className="reg">Don't have an account? Get Started</h4>
                </div>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Signup;
