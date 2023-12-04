import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5589",
  // baseURL:'http://localhost:5589'
});
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
