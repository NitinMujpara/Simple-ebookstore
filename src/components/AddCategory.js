import React, { useState, useEffect } from "react";
import Head from "./head";
import Footer from "./Footer";
import { TextField, Button, FormHelperText } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import categoryService from "../service/categoryService";
import "./css/page.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);

  useEffect(() => {
    if (id) getCategoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name should not be empty"),
  });

  const getCategoryById = () => {
    categoryService.getById(Number(id)).then((res) => {
      console.log(res.data.result);
      setInitialValueState({
        id: res.data.result.id,
        name: res.data.result.name,
      });
    });
  };

  const handleSubmit = async (values) => {
    const payload = {
      id: values.id,
      name: values.name,
    };

    await categoryService.save(payload).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast.success(
          payload.id
            ? "Record updated successfully"
            : "Record created successfully"
        );
        navigate("/categories");
      } else {
        toast.error("Category Not Added");
      }
    });
  };
  return (
    <div className="page">
      <Head />
      <div>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, errors, setFieldValue, handleBlur }) => {
            console.log(errors, values);
            return (
              <Form>
                <TextField
                  id="outlined-required"
                  name="name"
                  label="Category"
                  value={values.name}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                  sx={{ width: "90%" }}
                />
                <FormHelperText error>
                  <ErrorMessage name="name" component="div" />
                </FormHelperText>

                <Button variant="contained" type="submit" color="success">
                  Add
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>

      <Footer />
    </div>
  );
};

export default AddCategory;
