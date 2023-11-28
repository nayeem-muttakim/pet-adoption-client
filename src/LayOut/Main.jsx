import { Grid } from "@mui/material";
import NavBar from "../HomePage/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Grid>
      <NavBar />
      <Outlet />
    </Grid>
  );
};

export default Main;
