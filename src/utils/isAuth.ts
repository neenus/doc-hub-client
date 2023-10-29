import axios from 'axios';


export const isAuth = async (): Promise<boolean> => {

  let isAuthenticated: boolean = false;

  const baseURL =
    import.meta.env.MODE = "production" ?
      import.meta.env.VITE_API_BASE_URL_PROD :
      import.meta.env.VITE_API_BASE_URL_DEV;

  try {
    const res = await axios({
      method: 'GET',
      url: `${baseURL}/auth/me`,
      withCredentials: true,
    })
    isAuthenticated = res.data?.success;
  } catch (err) {
    console.log(err);
  } finally {
    return isAuthenticated;
  }
};