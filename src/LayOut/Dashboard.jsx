import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import DashNav from "../components/DashNav";
import SideBarNav from "../components/SideBarNav";

const Dashboard = () => {
  return (
    <Grid>
      <Helmet>
        <title>FurNest | Dashboard</title>
      </Helmet>
      <DashNav />
      <Grid display={{ xs: "none", md: "block" }}>
        {/* dashboard */}
        <Grid display={"flex"}>
          {/* sidebar */}
          <Grid
            sx={{
              backgroundColor: "rgba(221, 218, 221, 0.75)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease-in-out",
              position: "fixed",
              left: 0,
              height: "100vh",
            }}
          >
            <SideBarNav />
          </Grid>
          {/* sidebar content */}
          <Grid item flex={1} sx={{ marginLeft: { md: 25, lg: 0 } }}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
      {/* responsive dashboard */}
      <Grid display={{ md: "none" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
