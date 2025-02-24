import { Avatar, Button, Grid, Typography } from "@mui/material";
// import fbLogo from "/facebook.webp";
import ggLogo from "/google.png";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
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
          console.log(res);
        });
      })
      .catch((err) => {
        toast.error("Invalid User", { id: toasted });
        console.log(err);
      });
  };
  // const handleFb = async () => {
  //   const toasted = toast.loading("Logging In");
  //   fbLogin()
  //     .then((res) => {
  //       const userInfo = {
  //         email: res?.user?.email,
  //         name: res?.user?.displayName,
  //         image: res?.user?.photoURL,
  //         role: "user",
  //       };
  //       axiosPublic.post("/users", userInfo).then((res) => {
  //         toast.success("Logged In", { id: toasted });
  //         navigate(from);
  //         console.log(res);
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error("Invalid User", { id: toasted });
  //       console.log(err);
  //     });
  // };
  return (
    <Grid my={4} display="flex" justifyContent={"space-around"} gap={2}>
      {/* google register */}
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          py: 1.5,
          bgcolor: "#E9E7EA",
          ":hover": { bgcolor: "#F0EAF3" },
          borderRadius: 2,
          width: "100%",
        }}
        onClick={handleGoogle}
      >
        <Avatar sx={{ width: 24, height: 24 }} src={ggLogo} />
        <Typography variant="body2" color={"#000000"} fontWeight={600}>
          Google
        </Typography>
      </Button>
    </Grid>
  );
};

export default SocialAuthentication;
