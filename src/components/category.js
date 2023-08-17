import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Head from "./head";
import Footer from "./Footer";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import Pagination from "@mui/material/Pagination/Pagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../style/theme";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import categoryService from "../service/categoryService";
import ConfirmationDialog from "./dialog/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const Category = () => {
  // Rename the component to start with an uppercase letter
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const getCategory = async () => {
    await categoryService.GetAll().then((response) => {
      if (response && response.status === 200) {
        setCategories(response.data.result);
      }
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onConfirmDelete = () => {
    categoryService
      .deleteCategory(selectedId)
      .then((res) => {
        toast.success("Category Deleted Successfully");
        setShowDelete(false);
        // setFilters({ ...filters, pageIndex: 1 });
      })
      .catch((e) => toast.error("Book Deletion gone Failed"));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="page">
      <Head />
      <div className="Booklist">
        <Button
          variant="contained"
          size="small"
          color="primary" // Use the primary color from your theme
          style={{ float: "right", marginBottom: "2px", width: "20%" }}
          onClick={() => navigate("/addcat")}
        >
          Add Category
        </Button>
        <br />
        <br />
        <div className="BooklistContainer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(startIndex, endIndex)
                  .map((category, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {category.id}{" "}
                      </TableCell>
                      <TableCell align="right">{category.name}</TableCell>{" "}
                      <TableCell align="right">
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary" // Use the primary color from your theme
                            style={{ marginRight: "8px" }}
                            onClick={() => {
                              navigate(`/editcat/${category.id}`);
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            style={{
                              color: "white",
                              backgroundColor: theme.palette.error.main,
                            }} // Use the error color from your theme
                            disableElevation
                            onClick={() => {
                              setShowDelete(true);
                              setSelectedId(category.id ?? 0);
                            }}
                          >
                            Delete
                          </Button>
                        </ThemeProvider>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Pagination
        count={Math.ceil(categories.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        shape="rounded"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <ConfirmationDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => onConfirmDelete()}
        title="Delete Category"
        description="Are you sure you want to delete this Category?"
      />
      <Footer />
    </div>
  );
};

export default Category; // Export the component with the correct name
