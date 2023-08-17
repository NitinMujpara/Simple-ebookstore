import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

class AuthService {
  Register = async (payload) => {
    return axios.post(`${BASEURL}`, payload);
  };

  Login = async (payload) => {
    return axios.post(`${BASEURL}/login`, payload);
  };

  GetAll = async () => {
    return axios.get(`${BASEURL}/all`);
  };

  update = async (payload) => {
    return axios.put(`${BASEURL}`, payload);
  };

  delete = async (id) => {
    return axios.delete(`${BASEURL}?id=${id}`);
  };
}

const authService = new AuthService();
export default authService;

// export default new AuthService();
