import React, { useEffect, useState } from "react";
import bookService from "../service/bookService";
import cartService from "../service/cartService";
import Head from "./head";
import Footer from "./Footer";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./css/page.css";
import "./css/book.css";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { useCartContext } from "../context/cartContext";

const Booklist = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const getBooks = async () => {
    await bookService.GetAllBooks().then((response) => {
      if (response) {
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

  const addToCart = (book) => {
    cartService.addToCart(book, authContext.user.id).then((res) => {
      if (res?.error) {
        toast.error("Add To Cart didn't work");
      } else {
        toast.success("Add To Cart Worked Successfully");
        cartContext.updateCart();
      }
    });
  };

  return (
    <div className="page">
      <Head />
      <div className="bookslist">
        <div className="sorting-area">
          <div className="main">
            <Typography style={{ textAlign: "center" }} variant="h5">
              Total Books :- {books.length}
            </Typography>
            <TextField
              type="text"
              placeholder="Search book"
              className="book-search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="select">Sort by</InputLabel>
              <Select
                style={{ width: "90px" }}
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <MenuItem value="a-z">a-z</MenuItem>
                <MenuItem value="z-a">z-a</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            <Grid spacing={2} fixed width={1200} style={{ margin: "auto" }}>
              <Grid spacing={2} container>
                {filteredAndSortedBooks
                  .slice(startIndex, endIndex)
                  .map((book, index) => (
                    <Grid item xs={4} key={index}>
                      <Card sx={{ minWidth: 275, minHeight: 470 }}>
                        <CardContent>
                          <div className="product-list" key={index}>
                            <em>
                              <CardMedia
                                component="img"
                                height="304"
                                image={book.base64image}
                                alt="Book cover"
                              />
                            </em>
                            <div className="content-wrapper">
                              <Typography variant="h5">{book.name}</Typography>
                              <span className="category">{book.category}</span>
                              <span className="description">
                                {book.description
                                  .split(" ")
                                  .slice(0, 7)
                                  .join(" ")}
                              </span>
                              <p className="price">
                                <span className="discount">
                                  MRP: {book.price}
                                </span>
                              </p>
                              <Button
                                style={{
                                  color: "cornflowerblue",
                                  marginTop: "15px",
                                }}
                                className="MuiButtonBase-root"
                              >
                                <span
                                  className="MuiButton-label"
                                  onClick={() => addToCart(book)}
                                >
                                  ADD TO CART
                                </span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
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
      </div>
      <Footer />
    </div>
  );
};

export default Booklist;
