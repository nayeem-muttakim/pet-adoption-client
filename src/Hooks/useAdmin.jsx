import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data :idAdmin,isLoading:isAdminLoading } = useQuery({
    queryKey: [user?.email, "idAdmin"],
    queryFn: async () => {
      const res = await axiosSecure(`/user/admin/${user.email}`);
      // console.log(res.data);
      return res.data?.admin;
    },
  });
  return [idAdmin,isAdminLoading]
};

export default useAdmin;
