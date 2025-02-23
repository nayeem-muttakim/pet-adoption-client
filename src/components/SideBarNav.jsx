import { People, Pets, VolunteerActivism } from "@mui/icons-material";
import { ListItemContent } from "@mui/joy";
import { Button, Divider, Grid, List, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
const SideBarNav = () => {
  const [isAdmin] = useAdmin();
  return (
    <Grid sx={{ fontWeight: 600 }}>
      {/* all user sidebar */}
      <List sx={{ display: "grid", gap: 1, px: 1 }}>
        {/* add */}
        <NavLink to="add-pet">
          <Button variant="contained" sx={{ width: "100%", textAlign: "left" }}>
            <ListItemContent> Add a Pet</ListItemContent>
          </Button>
        </NavLink>
        {/* my added pets */}
        <NavLink to="added-pets">
          <Button variant="contained" sx={{ width: "100%", textAlign: "left" }}>
            <ListItemContent >
              {" "}
              Added Pets
            </ListItemContent>
          </Button>
        </NavLink>
        {/* adoption request */}
        <NavLink to="adoption-request">
          <Button variant="contained" sx={{ width: "100%", textAlign: "left" }}>
            <ListItemContent >
              {" "}
              Adoption Request
            </ListItemContent>
          </Button>
        </NavLink>
        {/* create donation */}
        <NavLink to="create-donation">
          <Button variant="contained" sx={{ width: "100%", textAlign: "left" }}>
            <ListItemContent >
              {" "}
              Add Donation Campaign
            </ListItemContent>
          </Button>
        </NavLink>
        {/* my donation campaign */}
        <NavLink to="donation-campaign">
          <Button variant="contained" sx={{ width: "100%", textAlign: "left" }}>
            <ListItemContent >
              {" "}
              My Donation Campaigns
            </ListItemContent>
          </Button>
        </NavLink>
        {/* my donations */}
        <NavLink to="donations">
          <Button variant="contained" sx={{ width: "100%", textAlign: "left" }}>
            <ListItemContent >
              {" "}
              My Donations
            </ListItemContent>
          </Button>
        </NavLink>
      </List>
      {/* admin extra sidebar */}
      {isAdmin && (
        <>
          <Divider variant="middle">Admin</Divider>
          <List sx={{ display: "grid", gap: 1, paddingX: 1 }}>
            {/* users */}
            <NavLink to="users">
              <Button
                variant="outlined"
                sx={{ width: "100%", textAlign: "left" }}
              >
                <ListItemIcon>
                  <People sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemContent sx={{ color: "black" }}>
                  {" "}
                  Users
                </ListItemContent>
              </Button>
            </NavLink>
            {/* all pets */}
            <NavLink to="all-pets">
              <Button
                variant="outlined"
                sx={{ width: "100%", textAlign: "left" }}
              >
                <ListItemIcon sx={{ color: "black" }}>
                  <Pets />
                </ListItemIcon>
                <ListItemContent sx={{ color: "black" }}>
                  {" "}
                  All Pets
                </ListItemContent>
              </Button>
            </NavLink>
            {/* all donation */}
            <NavLink to="all-campaigns">
              <Button
                variant="outlined"
                sx={{ width: "100%", textAlign: "left" }}
              >
                <ListItemIcon sx={{ color: "black" }}>
                  <VolunteerActivism />
                </ListItemIcon>
                <ListItemContent sx={{ color: "black" }}>
                  {" "}
                  All Campaigns
                </ListItemContent>
              </Button>
            </NavLink>
          </List>
        </>
      )}
    </Grid>
  );
};

export default SideBarNav;
