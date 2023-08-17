import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/cart";

class CartService {
  add = async (data) => {
    return axios.post(BASEURL, data);
  };

  getList = async (id) => {
    const url = `${BASEURL}?userId=${id}`;
    return axios.get(url);
  };

  updateItem = async (data) => {
    const url = `${BASEURL}`;
    return axios.put(url, data);
  };

  removeItem = async (id) => {
    const url = `${BASEURL}?id=${id}`;
    return axios.delete(url);
  };

  addToCart = async (book, id) => {
    return cartService
      .add({
        userId: id,
        bookId: book.id,
        quantity: 1,
      })
      .then((res) => {
        return { error: false, message: "Item added in cart" };
      })
      .catch((e) => {
        if (e.status === 500)
          return { error: true, message: "Item already in the cart" };
        else return { error: true, message: "something went wrong" };
      });
  };
}

const cartService = new CartService();
export default cartService;
