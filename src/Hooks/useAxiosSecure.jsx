import axios from "axios";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5589'
})
const useAxiosSecure = () => {
   
    return axiosSecure
  
      
    
};

export default useAxiosSecure;