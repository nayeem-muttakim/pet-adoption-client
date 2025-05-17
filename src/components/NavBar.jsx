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
import { Divider, Drawer, List } from "@mui/material";
import { useState } from "react";
const pages = (
  <>
    <Link to="pets" style={{ textDecoration: "none" }}>
      {" "}
      <Typography
        sx={{
          color: "#7c3aed",
          fontWeight: 600,
          px: 1,
          py: 0.5,
          ":hover": { bgcolor: "#FAF5FD" },
          borderRadius: 1,
        }}
      >
        Pets
      </Typography>
    </Link>
    <Link to="campaigns" style={{ textDecoration: "none" }}>
      {" "}
      <Typography
        sx={{
          color: "#7c3aed",
          fontWeight: 600,
          px: 1,
          py: 0.5,
          ":hover": { bgcolor: "#FAF5FD" },
          borderRadius: 1,
        }}
      >
        Campaigns
      </Typography>
    </Link>
  </>
);

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = () => {
    setNavOpen((prev) => !prev);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    await logOut();
  };

  const navMenu = (
    <Box onClick={handleOpenNavMenu} sx={{ textAlign: "center" }}>
      <Link style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "black", my: 2 }}
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
      <Divider />
      <List sx={{ display: "grid", gap: 1 }}>{pages}</List>
    </Box>
  );
  const container =
    window !== undefined ? () => window.document.body : undefined;

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
          {/* responsive pages */}
          <IconButton
            sx={{ display: { md: "none" } }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon sx={{ color: "#023047" }} />
          </IconButton>
          <Drawer
            container={container}
            open={navOpen}
            onClose={handleOpenNavMenu}
            sx={{
              display: { md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
              },
            }}
            disableScrollLock={true}
            disableAutoFocus={true}
            disableEnforceFocus={true}
          >
            {navMenu}
          </Drawer>
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
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    disableScrollLock={true}
                    
                  >
                    {/* Settings */}
                    <Box display={"grid"}>
                      {" "}
                      <Link to="dashboard">
                        <Button sx={{ color: "#7c3aed" }}>Dashboard</Button>
                      </Link>
                      <Button sx={{ color: "#7c3aed" }} onClick={handleLogout}>
                        Logout
                      </Button>
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
