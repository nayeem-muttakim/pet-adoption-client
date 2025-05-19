import { Grid, Paper, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import DonationCard from "./DonationCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: mydonations = [], refetch } = useQuery({
    queryKey: ["myDonations"],
    queryFn: async () => {
      const res = await axiosSecure(`/donations/mine?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <Grid>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          my: 2,
          mx: "auto",
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          Total Donations : {mydonations.length}
        </Typography>
      </Paper>
      <Grid
        px={{ lg: 40 }}
        py={5}
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={2}
      >
        {mydonations.map((mine) => (
          <DonationCard refetch={refetch} key={mine._id} mine={mine} />
        ))}
      </Grid>
    </Grid>
  );
};

export default MyDonation;
