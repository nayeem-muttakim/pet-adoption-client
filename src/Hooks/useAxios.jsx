import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'http://localhost:5589'
    // baseURL:'https://pet-adoption-server-orcin.vercel.app'
})
const useAxios = () => {
   
    return axiosPublic
  
      
    
};

export default useAxios;