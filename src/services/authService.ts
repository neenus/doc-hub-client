import axios from "axios";

type credentials = {
  email: string;
  password: string;
}

const baseUrl =
  import.meta.env.PROD ?
    import.meta.env.VITE_API_BASE_URL_PROD :
    import.meta.env.VITE_API_BASE_URL_DEV;

const login = async (user: credentials) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data.data;
}

const me = async () => {
  const response = await axios.get(`${baseUrl}/me`);
  return response.data.data;
}

const logout = () => axios.get(`${baseUrl}/logout`);

const authService = {
  login,
  logout,
  me
};

export default authService;