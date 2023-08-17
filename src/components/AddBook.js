import React, { useState, useEffect } from "react";
import Head from "./head";
import Footer from "./Footer";
import {
  InputLabel,
  MenuItem,
  Select,
  Input,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormHelperText, Box } from "@mui/material";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../service/categoryService";
import bookService from "../service/bookService";
import { loginbox, logincontainer } from "../style/commonStyle";
import { toast } from "react-toastify";
import "./css/page.css";

const AddBook = () => {
  const initialValues = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
  });

  const [initialValueState, setInitialValueState] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getAllCategories();
    if (id) getBookById();
  }, [id]);

  const getAllCategories = async () => {
    try {
      const response = await categoryService.GetAll();
      if (response.data) {
        setCategories(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      // console.log("Fetched book data:", res);
      setInitialValueState({
        id: res.data.result.id,
        name: res.data.result.name,
        price: res.data.result.price,
        categoryId: res.data.result.categoryId,
        description: res.data.result.description,
        base64image: res.data.result.base64image,
      });
    });
  };

  const onSubmit = (values) => {
    // console.log(values);
    bookService
      .save(values)
      .then((res) => {
        toast.success(
          values.id
            ? "Record updated successfully"
            : "Record created successfully"
        );
        navigate("/blist");
      })
      .catch((e) => toast.error("Failed to store data"));
  };

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 50000) {
          toast.error("File size must be less than 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("Only jpg, jpeg, and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };

  return (
    <div className="page">
      <Head />
      <div>
        <Box sx={logincontainer}>
          <Typography variant="h1">{id ? "Edit" : "Add"} Book</Typography>
          <Box sx={loginbox}>
            <Formik
              initialValues={initialValueState}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                setFieldValue,
                handleChange,
                setFieldError,
                handleBlur,
                handleSubmit,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      id="outlined-required"
                      name="name"
                      label="Book Name"
                      onChange={handleChange}
                      value={values.name}
                      sx={{ width: "90%" }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="name" component="div" />
                    </FormHelperText>
                    <br />
                    <br />

                    <TextField
                      id="outlined-required"
                      name="price"
                      label="Book Price"
                      onChange={handleChange}
                      value={values.price}
                      sx={{ width: "90%" }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="price" component="div" />
                    </FormHelperText>
                    <br />
                    <br />

                    <InputLabel htmlFor="select">Category *</InputLabel>
                    {categories.length > 0 && (
                      <Select
                        name="categoryId"
                        id="category"
                        onChange={handleChange}
                        className="select"
                        value={values.categoryId} // This should be connected to the categoryId field
                      >
                        {categories.map((category, index) => (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    <FormHelperText error>
                      <ErrorMessage name="categoryId" component="div" />
                    </FormHelperText>
                    <br />
                    <br />

                    <div className="form-col">
                      {!values.base64image && (
                        <>
                          {" "}
                          <label
                            htmlFor="contained-button-file"
                            className="file-upload-btn"
                          >
                            <Input
                              id="contained-button-file"
                              type="file"
                              name="file"
                              onBlur={handleBlur}
                              onChange={(e) => {
                                onSelectFile(e, setFieldValue, setFieldError);
                              }}
                            />
                            <Button
                              variant="contained"
                              component="span"
                              className="btn pink-btn"
                            >
                              Upload
                            </Button>
                          </label>
                          <FormHelperText error>
                            <ErrorMessage name="base64image" component="div" />
                          </FormHelperText>
                        </>
                      )}
                      {values.base64image && (
                        <div className="uploaded-file-name">
                          <em>
                            <img
                              src={values.base64image}
                              alt=""
                              style={{ width: "50px", height: "50px" }}
                            />
                          </em>
                          image{" "}
                          <span
                            onClick={() => {
                              setFieldValue("base64image", "");
                            }}
                          >
                            x
                          </span>
                        </div>
                      )}
                    </div>

                    <TextField
                      id="outlined-required"
                      name="description"
                      label="Book Description"
                      onChange={handleChange}
                      value={values.description}
                      sx={{ width: "90%" }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="description" component="div" />
                    </FormHelperText>
                    <br />
                    <br />

                    <Button
                      variant="contained"
                      type="submit"
                      color="success"
                      disableElevation
                    >
                      Add Book
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default AddBook;
