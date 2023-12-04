import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://pet-adoption-server-orcin.vercel.app",
  // baseURL:'https://pet-adoption-server-orcin.vercel.app'
});
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
