import axios from 'axios';

// isAuth is a function that makes a request to the /auth/me endpoint
export const isAuth = async () => {
  let isAuthenticated = false;
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
      withCredentials: true,
    });
    isAuthenticated = res.data.success;
  } catch (error) {
    throw error;
  } finally {
    return isAuthenticated;
  }
}