import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gitLogo from "/Github.png";
import ggLogo from "/google.png";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login, googleLogin, gitLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;
      const toasted = toast.loading("Logging In");
      login(email, password)
        .then((res) => {
          toast.success("Logged In", { id: toasted });
          navigate(from)
        })
        .catch((err) => {
          toast.error("Invalid Email or Password", { id: toasted });
        });
    },
  });
  const handleGoogle = async () => {
    const toasted = toast.loading("Logging In");
    googleLogin()
      .then((res) => {
        toast.success("Logged In", { id: toasted });
        navigate(from)
      })
      .catch((err) => {
        toast.error("Invalid User", { id: toasted });
      });
  };
  const hanldeGithub = async () => {
    const toasted = toast.loading("Logging In");
    gitLogin
      .then((res) => {
        toast.success("Logged In", { id: toasted });
        navigate(from)
      })
      .catch((err) => {
        toast.error("Invalid User", { id: toasted });
      });
  };
  return (
    <Grid px={1} sx={{ maxWidth: 600, mx: "auto", my: 10 }}>
      <Helmet>
        <title>Pet Adoption | Login</title>
      </Helmet>

      <Grid border={1}>
        {/* Email Pass Login */}
        <Grid>
          {" "}
          <Typography pl={5} pt={2} variant="h4">
            Login
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
            <TextField
              label="Email"
              variant="standard"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />

            <TextField
              label="Password"
              variant="standard"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Login
            </Button>
            <Typography>
              Don't have an account?{" "}
              <Link to="/register">
                <Typography variant="span" sx={{ color: "#d4a373" }}>
                  Create one
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
        {/* google login */}
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
        {/* github login */}
        <Button onClick={hanldeGithub}>
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

export default Login;
