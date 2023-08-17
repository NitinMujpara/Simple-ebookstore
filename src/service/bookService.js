import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
  search = async (payload) => {
    return axios.get(`${BASEURL}/search?keyword=${payload.keyword}`); // Fix the way payload is passed
  };

  GetAllBooks = async () => {
    return axios.get(`${BASEURL}/all`);
  };

  getById = async (id) => {
    return axios.get(`${BASEURL}/byId?id=${id}`);
  };

  save = async (payload) => {
    if (payload.id) {
      // If payload has an id, it's an update (PUT) request
      return axios.put(`${BASEURL}`, payload);
    } else {
      // If payload doesn't have an id, it's a create (POST) request
      return axios.post(`${BASEURL}`, payload);
    }
  };

  deleteBook = async (id) => {
    return axios.delete(`${BASEURL}?id=${id}`);
  };
}

const bookService = new BookService();
export default bookService;
