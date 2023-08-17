import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";

class CategoryService {
  GetAll = async () => {
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

  deleteCategory = async (id) => {
    return axios.delete(`${BASEURL}?id=${id}`);
  };
}

const categoryService = new CategoryService();
export default categoryService;
