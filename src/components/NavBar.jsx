import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { Divider } from "@mui/material";
const pages = (
  <>
    <Link to="pets">
      {" "}
      <Button sx={{ color: "#7c3aed", fontSize: 12, fontWeight: 600 }}>
        Pets
      </Button>
    </Link>
    <Link to="campaigns">
      {" "}
      <Button sx={{ color: "#7c3aed", fontSize: 12, fontWeight: 600 }}>
        Campaigns
      </Button>
    </Link>
  </>
);

const NavBar = () => {
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
        paddingX: { xs: 1, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* responsive pages */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu}>
              <MenuIcon sx={{ color: "#023047" }} />
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
            >
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                textAlign="center"
              >
                {" "}
                {pages}
              </Typography>
            </Menu>
          </Box>
          {/* Logo */}
          <Link style={{ textDecoration: "none" }}>
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

          {/* navbar end */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
            {/* login button */}
            {!user && (
              <Link to="login">
                {" "}
                <Button
                  sx={{
                    color: "#ffffff",
                    fontSize: 12,
                    bgcolor: "#7c3aed",
                    ":hover": { bgcolor: "#7c3aedE6" },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
            {/* User Setting */}
            <Box>
              {user && (
                <Avatar
                  onClick={handleOpenUserMenu}
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                  }}
                  src={user?.photoURL}
                />
              )}

              {user && (
                <>
                  {" "}
                  <Menu
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* Settings */}
                    <Box>
                      {" "}
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {" "}
                        <Link to="dashboard">
                          <Button>Dashboard</Button>
                        </Link>
                        <Button onClick={handleLogout}>Logout</Button>
                      </Typography>
                    </Box>
                  </Menu>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
