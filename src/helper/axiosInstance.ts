import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://advance-online-learning-platform.vercel.app",
});
export default axiosInstance;
