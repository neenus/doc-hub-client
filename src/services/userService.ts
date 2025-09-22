import axios from "axios";
import { User } from "../types";

const baseUrl =
  import.meta.env.MODE === "production" ?
    import.meta.env.VITE_API_BASE_URL_PROD :
    import.meta.env.VITE_API_BASE_URL_DEV;

const getUsers = async () => {
  const query = {
    limit: 500,
    page: 1,
    sort: "createdAt",
    order: "asc"
  }

  const response = await axios.get(`${baseUrl}/users`, { params: query });
  return response.data.data;
}

const updateUser = async (user: User) => {
  const response = await axios.put(`${baseUrl}/users/${user._id}`, user);
  return response.data.data;
}

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/users/${id}`);
  return response.data.data;
}

const resetPassword = async (id: string) => {
  const response = await axios.post(`${baseUrl}/users/${id}/reset-password`);
  return response.data.data;
}

const userService = {
  getUsers,
  updateUser,
  deleteUser,
  resetPassword
};

export default userService;