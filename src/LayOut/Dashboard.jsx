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
            minHeight={"93.1vh"}
            sx={{
              backgroundColor: "rgba(221, 218, 221, 0.75)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease-in-out",
              
            }}
          >
            <SideBarNav />
          </Grid>
          {/* sidebar content */}
          <Grid flex={1}>
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
