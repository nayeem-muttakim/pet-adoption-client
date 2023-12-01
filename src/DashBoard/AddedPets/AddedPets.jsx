import { Grid } from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const AddedPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: [user?.email, "myAdded"],
    queryFn: async () => {
      const res = axiosSecure(`/pets?lister_email=${user?.email}`);
      return (await res).data;
    },
  });
  console.log(data);
  return <Grid></Grid>;
};

export default AddedPets;
