import React from "react";
import authService from "../service/authService";
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
import { useState } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../style/theme";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ConfirmationDialog from "./dialog/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const getUsers = async () => {
    await authService.GetAll().then((response) => {
      if (response && response.status === 200) {
        setUsers(response.data.result);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const onConfirmDelete = () => {
    authService
      .delete(selectedId)
      .then((res) => {
        toast.success("Category Deleted Successfully");
        setShowDelete(false);
        // setFilters({ ...filters, pageIndex: 1 });
      })
      .catch((e) => toast.error("Book Deletion gone Failed"));
  };

  return (
    <div className="page">
      <Head />
      <div className="Booklist">
        <div className="BooklistContainer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(startIndex, endIndex).map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="right">{user.firstName}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
                    <TableCell align="right">
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary" // Use the primary color from your theme
                          style={{ marginRight: "8px" }}
                          disableElevation
                          onClick={() => {
                            navigate(`/editUser/${user.id}`);
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
                          }}
                          onClick={() => {
                            setShowDelete(true);
                            setSelectedId(user.id ?? 0);
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
        count={Math.ceil(users.length / itemsPerPage)}
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
        title="Delete User"
        description="Are you sure you want to delete this User?"
      />

      <Footer />
    </div>
  );
};

export default Users;
