import React, { useState } from "react";
import Head from "./head";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { boxstyle } from "../style/commonStyle";
import { btn } from "../style/commonStyle";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../style/theme";
import "./css/page.css";

function Model() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [rows, setRows] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const newRow = { id: rows.length + 1, title, author, price };
    setRows([...rows, newRow]);

    setTitle("");
    setAuthor("");
    setPrice("");
  };

  return (
    <div>
      <Head />
      <div className="page">
        <Button onClick={handleOpen}>Add Book</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxstyle}>
            <h2 id="parent-modal-title">Sample Page</h2>
            <br />
            <TextField
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="outlined-required"
              label="Book Title"
              defaultValue=""
            />
            <br />
            <br />

            <TextField
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              id="outlined-required"
              label="Book Author"
              defaultValue=""
            />
            <br />
            <br />

            <TextField
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="outlined-required"
              label="Book Price"
              defaultValue=""
            />
            <br />
            <br />
            <Button
              sx={btn}
              variant="contained"
              color="success"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Box>
        </Modal>
        <br />
        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.author}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <ThemeProvider theme={theme}>
                      <Button variant="contained">Update</Button>
                      <Button variant="contained" color="error">
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
      <Footer />
    </div>
  );
}

export default Model;
