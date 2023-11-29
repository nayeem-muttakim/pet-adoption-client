import { Grid, ListItemButton } from "@mui/material";
import List from "@mui/joy/List";

import { Helmet } from "react-helmet-async";
import {  Outlet } from "react-router-dom";

import DashNav from "../DashBoard/DashNav";
import SideBarNav from "../DashBoard/SideBarNav";

const Dashboard = () => {
  return (
    <Grid>
      <Helmet>
        <title>Pet Adoption | Dashboard</title>
      </Helmet>
      <DashNav />
      <Grid display={{ xs: "none", md: "block" }}>
        {/* dashboard */}
        <Grid display={"flex"}>
          {/* sidebar */}
          <Grid
            width={{ xs: 120, sm: 250 }}
            minHeight={"90vh"}
            sx={{ bgcolor: "#8ecae6"}}
          >
          <SideBarNav/>
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
