import axios from "axios";
import { User } from "../types";

const baseUrl =
  import.meta.env.MODE === "production" ?
    import.meta.env.VITE_API_BASE_URL_PROD :
    import.meta.env.VITE_API_BASE_URL_DEV;

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data.data;
}

const updateUser = async (user: User) => {
  const response = await axios.put(`${baseUrl}/users/${user._id}`, user);
  return response.data.data;
}

const userService = {
  getUsers,
  updateUser
};

export default userService;