import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import fbLogo from "/facebook.webp";
import ggLogo from "/google.png";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";

const SocialAuthentication = () => {
  const { googleLogin, fbLogin } = useAuth();

  const axiosPublic = useAxios();

  const location = useLocation();

  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  const handleGoogle = async () => {
    const toasted = toast.loading("Logging In");

    googleLogin()
      .then((res) => {
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          image: res?.user?.photoURL,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          toast.success("Logged In", { id: toasted });
          navigate(from);
        });
      })
      .catch((err) => {
        toast.error("Invalid User", { id: toasted });
      });
  };
  const handleFb = async () => {
    const toasted = toast.loading("Logging In");
    fbLogin()
      .then((res) => {
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          image: res?.user?.photoURL,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          toast.success("Logged In", { id: toasted });
          navigate(from);
        });
      })
      .catch((err) => {
        toast.error("Invalid User", { id: toasted });
      });
  };
  return (
    <Grid my={2}>
      {/* google register */}
      <Button onClick={handleGoogle}>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={{ xs: 2, sm: 10 }}
          border={1}
          mx={{ xs: 2, sm: 12 }}
          px={3}
          py={1}
          borderRadius={12}
        >
          <Avatar src={ggLogo} />
          <Typography variant="body1">Continue With Google</Typography>
        </Box>
      </Button>

      {/* github register */}
      <Button onClick={handleFb}>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={{ xs: 2, sm: 10 }}
          border={1}
          mx={{ xs: 2, sm: 12 }}
          px={2}
          py={1}
          borderRadius={12}
        >
          <Avatar src={fbLogo}></Avatar>
          <Typography variant="body1">Continue With FaceBook</Typography>
        </Box>
      </Button>
    </Grid>
  );
};

export default SocialAuthentication;
