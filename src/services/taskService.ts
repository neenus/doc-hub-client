import axios from "axios";

const baseUrl =
  import.meta.env.MODE === "production" ?
    import.meta.env.VITE_API_BASE_URL_PROD :
    import.meta.env.VITE_API_BASE_URL_DEV;

const getTasks = async () => {
  const query = {
    limit: 500,
    page: 1,
    sort: "createdAt",
    order: "asc"
  }

  const response = await axios.get(`${baseUrl}/tasks`, { params: query });
  return response.data.data;
}

const taskService = {
  getTasks
};

export default taskService;