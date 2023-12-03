import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pet = {} } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const res = await axiosSecure(`/pet/${id}`);
      return res.data;
    },
  });

  return <Grid>Details</Grid>;
};

export default PetDetails;
