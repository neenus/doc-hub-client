import axios from "axios";

const baseUrl =
  import.meta.env.MODE === "production" ?
    import.meta.env.VITE_API_BASE_URL_PROD :
    import.meta.env.VITE_API_BASE_URL_DEV;

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data.data;
}

const userService = {
  getUsers
};

export default userService;