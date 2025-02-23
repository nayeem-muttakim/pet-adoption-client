import { Grid } from "@mui/material";

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <Grid>
      <NavBar />
      <Outlet />
    </Grid>
  );
};

export default Main;
