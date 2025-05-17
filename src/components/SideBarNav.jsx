import { People, Pets, VolunteerActivism } from "@mui/icons-material";
import { ListItemContent } from "@mui/joy";
import { Button, Divider, Grid, List, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const dashRoutes = [
  { route: "add-pet", name: "Add a Pet" },
  { route: "added-pets", name: "Added Pets" },
  { route: "adoption-request", name: "Adoption Request" },
  { route: "create-donation", name: "Create Campaign" },
  { route: "donation-campaign", name: "My Campaigns" },
  { route: "donations", name: "My Donations" },
];

const SideBarNav = () => {
  const [isAdmin] = useAdmin();
  return (
    <Grid sx={{ fontWeight: 600 }}>
      {/* all user sidebar */}
      <List sx={{ display: "grid", gap: 1, px: 1 }}>
        {dashRoutes.map((dashRoute) => (
          <NavLink to={dashRoute.route} key={dashRoute.name}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                textAlign: "left",
                bgcolor: "#7c3aedE6",
                ":hover": { bgcolor: "#7c3aed" },
              }}
            >
              <ListItemContent>{dashRoute.name}</ListItemContent>
            </Button>
          </NavLink>
        ))}
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
                sx={{
                  width: "100%",
                  textAlign: "left",
                  borderColor: "#7c3aed",
                }}
              >
                <ListItemIcon>
                  <People sx={{ color: "#7c3aed" }} />
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
                sx={{
                  width: "100%",
                  textAlign: "left",
                  borderColor: "#7c3aed",
                }}
              >
                <ListItemIcon sx={{ color: "#7c3aed" }}>
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
                sx={{
                  width: "100%",
                  textAlign: "left",
                  borderColor: "#7c3aed",
                }}
              >
                <ListItemIcon sx={{ color: "#7c3aed" }}>
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
