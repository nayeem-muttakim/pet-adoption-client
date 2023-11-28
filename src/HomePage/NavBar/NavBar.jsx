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
import Tooltip from "@mui/material/Tooltip";

import { Link } from "react-router-dom";

import logo from "/pet.jpg";
import useAuth from "../../Hooks/useAuth";
const pages = (
  <>
    <Link to="/">
      {" "}
      <Button sx={{ color: "#023047", fontSize: { xs: 15, md: 20 } }}>
        Home
      </Button>
    </Link>
    <Link to='listing'>
      {" "}
      <Button sx={{ color: "#023047", fontSize: { xs: 15, md: 20 } }}>
        Pet Listing
      </Button>
    </Link>
    <Link>
      {" "}
      <Button sx={{ color: "#023047", fontSize: { xs: 15, md: 20 } }}>
        Donation-CamPaigns
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
    const res = await logOut();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ccd5ae" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Avatar
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: 70,
              height: 70,
              marginY: 1,
            }}
            src={logo}
          ></Avatar>
          {/* responsive pages */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#023047" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                textAlign="center"
              >
                {" "}
                {pages}
                {!user && (
                  <Link to="login">
                    {" "}
                    <Button
                      sx={{
                        color: { xs: "#023047", md: "#ccd5ae" },
                        fontSize: { xs: 15, md: 20 },
                        backgroundColor: { md: "#023047" },
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </Typography>
            </Menu>
          </Box>
          {/* responsive logo */}
          <Avatar
            sx={{
              display: { xs: "flex", md: "none" },
              mr: { xs: 10, sm: 35 },
              width: 55,
              height: 55,
              marginY: 1,
            }}
            src={logo}
          ></Avatar>
          {/* Pages */}
          <Box
            sx={{
              flexGrow: 1,
              paddingX: { lg: 40 },
              display: { xs: "none", md: "flex" },
              gap: 2,
            }}
          >
            {pages}
            {!user && (
              <Link to="login">
                {" "}
                <Button
                  sx={{
                    color: { xs: "#023047", md: "#ccd5ae" },
                    fontSize: { xs: 15, md: 20 },
                    backgroundColor: { md: "#023047" },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
          {/* User Setting */}{" "}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                {user && (
                  <>
                    {" "}
                    <Avatar
                      sx={{
                        width: { sx: 50, sm: 60 },
                        height: { sx: 40, sm: 60 },
                      }}
                      src={user?.photoURL}
                    />
                  </>
                )}
              </IconButton>
            </Tooltip>

            {user && (
              <>
                {" "}
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
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
                        fontFamily: "sans-serif",
                      }}
                      textAlign="center"
                    >
                      {" "}
                      <Link>
                        <Button>Dashboard</Button>
                      </Link>
                      <Button onClick={handleLogout}>Logout</Button>
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
export default NavBar;
