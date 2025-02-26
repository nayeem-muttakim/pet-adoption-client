import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Divider } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import SideBarNav from "./SideBarNav";

const pages = (
  <>
    <Link to="/pets">
      {" "}
      <Button sx={{ color: "#7c3aed", fontSize: 12, fontWeight: 600 }}>
        Pets
      </Button>
    </Link>
    <Link to="/campaigns">
      {" "}
      <Button sx={{ color: "#7c3aed", fontSize: 12, fontWeight: 600 }}>
        Campaigns
      </Button>
    </Link>
  </>
);

const DashNav = () => {
  const { user, logOut } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    await logOut();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* responsive dash */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu}>
              <Dashboard sx={{ color: "#023047" }} />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { md: "none" },
              }}
              disableScrollLock={true}
            >
              {/* sidebar */}

              <SideBarNav />
            </Menu>
          </Box>

          {/* Logo */}
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Fur
              <Typography
                variant="h6"
                component="span"
                sx={{ color: "#7c3aed", fontWeight: "bold" }}
              >
                Nest
              </Typography>
            </Typography>
          </Link>

          <Box display={"flex"} alignItems={"center"}>
            {/* Pages */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
              }}
            >
              {pages}
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ marginX: 2, display: { xs: "none", md: "block" } }}
            />
            {/*  Setting handler */}
            {user && (
              <>
                {" "}
                <Avatar
                  onClick={handleOpenUserMenu}
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                  }}
                  src={user?.photoURL}
                />
              </>
            )}

            {/* user setting */}
            {user && (
              <>
                {" "}
                <Menu
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  disableScrollLock={true}
                >
                  {/* Settings */}
                  <Box>
                    {" "}
                    <Typography textAlign="center">
                      {" "}
                      <Box display={{ xs: "block", md: "none" }}>
                        <Box
                          sx={{
                            display: "grid",
                          }}
                        >
                          {pages}
                        </Box>
                        <Divider
                          orientation="horizontal"
                          flexItem
                          sx={{
                            marginX: 1,
                            display: { md: "none" },
                          }}
                        />
                      </Box>
                      <Button
                        sx={{ color: "#7c3aed", fontSize: 12, fontWeight: 600 }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Typography>
                  </Box>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default DashNav;
