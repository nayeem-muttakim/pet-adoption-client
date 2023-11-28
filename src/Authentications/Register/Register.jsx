import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import gitLogo from "/Github.png";
import ggLogo from "/google.png";

import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";

const Register = () => {
  const { register, updateUser, googleLogin, gitLogin } = useAuth();
  const navigate = useNavigate();
  const handleReg = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const image = e.target.image.files[0];
    const toasted = toast.loading("Creating User");
    try {
      // upload image
      const imageData = await imageUpload(image);

      // create user
      const result = await register(email, pass);
      // user name and image
      await updateUser(name, imageData?.data?.display_url);
      toast.success("User Created", { id: toasted });
    
      navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogle = async () => {
    const toasted = toast.loading("Signning In");
    googleLogin()
      .then((res) => {
        toast.success("Signed In", { id: toasted });
        navigate("/");
      })
      .catch((err) => {
        toast.error("Invalid", { id: toasted });
      });
  };
  const handleGithub = async () => {
    const toasted = toast.loading("Signning In");
    gitLogin()
      .then((res) => {
        toast.success("Signed In", { id: toasted });
        navigate("/");
      })
      .catch((err) => {
        toast.error("Invalid", { id: toasted });
      });
  };
  return (
    <Grid px={1} sx={{ maxWidth: 600, mx: "auto", my: 10 }}>
      <Helmet>
        <title>Pet Adoption | Register</title>
      </Helmet>
      <Grid border={1}>
        {/* Email Pass Login */}
        <Grid>
          {" "}
          <Typography pl={5} pt={2} variant="h4">
            Create an account
          </Typography>
        </Grid>
        <form onSubmit={handleReg}>
          <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
            <TextField
              label="Full Name"
              variant="standard"
              name="name"
              type="text"
              required
            />

            <TextField variant="outlined" name="image" type="file" required />
            <TextField
              label="Email"
              variant="standard"
              name="email"
              type="email"
              required
            />

            <TextField
              label="Password"
              variant="standard"
              name="password"
              type="password"
              required
            />

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#ccd5ae",
                color: "black",
                px: { xs: 10, sm: 19 },
                py: 1,
                fontSize: { sx: 10, md: 18 },
                fontWeight: 700,
              }}
            >
              Create an account
            </Button>
            <Typography>
              Already have an account?{" "}
              <Link to="/login">
                <Typography variant="span" sx={{ color: "#d4a373" }}>
                  Login
                </Typography>
              </Link>
            </Typography>
          </Grid>
        </form>

        {/* Additionals */}
      </Grid>
      <Divider sx={{ mt: 2 }} orientation="horizontal" variant="middle">
        Or
      </Divider>
      <Grid my={2}>
        {/* google register */}
        <Button onClick={handleGoogle}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ xs: 3, sm: 13 }}
            border={1}
            mx={{ xs: 2, sm: 5 }}
            px={3}
            py={1}
            borderRadius={12}
          >
            <Avatar src={ggLogo}></Avatar>
            <Typography variant="body1">Continue With Google</Typography>
          </Box>
        </Button>

        {/* github register */}
        <Button onClick={handleGithub}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={{ xs: 3, sm: 13 }}
            border={1}
            mx={{ xs: 2, sm: 5 }}
            px={3}
            py={1}
            borderRadius={12}
          >
            <Avatar src={gitLogo}></Avatar>
            <Typography variant="body1">Continue With Github</Typography>
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
