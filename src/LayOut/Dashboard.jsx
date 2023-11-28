import { Grid, ListItemButton } from "@mui/material";
import List from "@mui/joy/List";

import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import { ListItemContent } from "@mui/joy";
import DashNav from "../DashBoard/DashNav";

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
            sx={{ bgcolor: "#023047" }}
          >
            <List>
              {/* add */}
              <NavLink to="add-pet">
                <ListItemButton sx={{ color: "white" }} variant="soft">
                  <ListItemContent sx={{ color: "white" }}>
                    {" "}
                    Add a Pet
                  </ListItemContent>
                </ListItemButton>
              </NavLink>
              {/* my added pets */}
              <NavLink to="added-pets">
                <ListItemButton sx={{ color: "white" }} variant="soft">
                  <ListItemContent sx={{ color: "white" }}>
                    {" "}
                    Added Pets
                  </ListItemContent>
                </ListItemButton>
              </NavLink>
              {/* adoption request */}
              <NavLink to="adoption-request">
                <ListItemButton sx={{ color: "white" }} variant="soft">
                  <ListItemContent sx={{ color: "white" }}>
                    {" "}
                    Adopt Request
                  </ListItemContent>
                </ListItemButton>
              </NavLink>
              {/* create donation */}
              <NavLink to="create-donation">
                <ListItemButton sx={{ color: "white" }} variant="soft">
                  <ListItemContent sx={{ color: "white" }}>
                    {" "}
                    Create Donation
                  </ListItemContent>
                </ListItemButton>
              </NavLink>
              {/* my donation campaign */}
              <NavLink to="donation-campaign">
                <ListItemButton sx={{ color: "white" }} variant="soft">
                  <ListItemContent sx={{ color: "white" }}>
                    {" "}
                    My Donation Campaigns
                  </ListItemContent>
                </ListItemButton>
              </NavLink>
              {/* my donations */}
              <NavLink to="donations">
                <ListItemButton sx={{ color: "white" }} variant="soft">
                  <ListItemContent sx={{ color: "white" }}>
                    {" "}
                    My Donations
                  </ListItemContent>
                </ListItemButton>
              </NavLink>
            </List>
          </Grid>
          {/* sidebar content */}
          <Grid flex={1}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
      <Grid display={{ md: "none" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
