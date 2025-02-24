import { Box, Grid, Typography } from "@mui/material";
import dash from "/dashboard.svg";
import useAuth from "../hooks/useAuth";

const DashHome = () => {
  const { user } = useAuth();
  return (
    <Grid my={5} px={3} textAlign={"center"}>
      <Typography
        variant="h5"
        color={"#7c3aed"}
      >{`Welcome To Dashboard ${user.displayName}`}</Typography>

      <Box component={"img"} src={dash} sx={{ maxHeight: 220, mt: 5 }} />
    </Grid>
  );
};

export default DashHome;
