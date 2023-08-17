import React from "react";
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
import bookService from "../service/bookService";
import Paper from "@mui/material/Paper";
import ConfirmationDialog from "./dialog/ConfirmationDialog";
import "./css/page.css";
import "./css/book.css";
import { useNavigate } from "react-router-dom";

const Books = () => {
  //   const [bookResponse, setBookResponse] = useState({
  //     pageIndex: 0,
  //     pageSize: 10,
  //     totalPages: 1,
  //     items: [],
  //     totalItems: 0,
  //   });
  const [searchText, setSearchText] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    await bookService.GetAllBooks().then((response) => {
      if (response && response.status === 200) {
        setBooks(response.data.result);
      }
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const filteredAndSortedBooks = books
    .filter((book) =>
      book.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "a-z") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "z-a") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const onConfirmDelete = () => {
    bookService
      .deleteBook(selectedId)
      .then((res) => {
        toast.success("Book Deleted Successfully");
        setShowDelete(false);
        navigate("/blist");
      })
      .catch((e) => toast.error("Book Deletion gone Failed"));
  };

  return (
    <div className="page">
      <Head />
      <div className="Booklist">
        <Button
          variant="contained"
          size="small"
          color="primary" // Use the primary color from your theme
          style={{ float: "right", marginBottom: "2px", width: "20%" }}
          onClick={() => navigate("/Addbook")}
        >
          Add Book
        </Button>
        <br />
        <br />
        <div className="BooklistContainer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSortedBooks
                  .slice(startIndex, endIndex)
                  .map((book, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {book.id}
                      </TableCell>
                      <TableCell align="right">{book.name}</TableCell>
                      <TableCell align="right">{book.category}</TableCell>
                      <TableCell align="right">{book.price}</TableCell>
                      <TableCell align="right">
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary" // Use the primary color from your theme
                            style={{ marginRight: "8px" }}
                            disableElevation
                            onClick={() => {
                              navigate(`/editBook/${book.id}`);
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
                              setSelectedId(book.id ?? 0);
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
        count={Math.ceil(filteredAndSortedBooks.length / itemsPerPage)}
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
        title="Delete book"
        description="Are you sure you want to delete this book?"
      />
      <Footer />
    </div>
  );
};

export default Books;
