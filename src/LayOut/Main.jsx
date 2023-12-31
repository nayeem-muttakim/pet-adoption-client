import { Grid } from "@mui/material";
import NavBar from "../HomePage/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Grid sx={{ backgroundColor: "#dedbd2", minHeight: 929 }}>
      <NavBar />
      <Outlet />
    </Grid>
  );
};

export default Main;
