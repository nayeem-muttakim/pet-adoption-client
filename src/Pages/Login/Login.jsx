import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialAuthentication from "../../Shared/SocialAuthentication";

const Login = () => {
  const { login } = useAuth();
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
          console.log(res);
          navigate(from);
        })
        .catch((err) => {
          toast.error("Invalid Email or Password", { id: toasted });
          console.log(err);
        });
    },
  });

  return (
    <Grid
      px={2}
      display={"grid"}
      alignItems={"center"}
      height={"80vh"}
      sx={{ maxWidth: 400, mx: "auto", my: 10 }}
    >
      <Helmet>
        <title>FurNest | Login</title>
      </Helmet>

      <Grid>
        <Grid>
          {" "}
          <Typography variant="h5">Hey! Welcome back</Typography>
          {/* social login */}
          <SocialAuthentication />
          <Divider orientation="horizontal" variant="middle">
            Or
          </Divider>
          {/* Email Pass Login
           */}
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ display: "grid", gap: 3, py: 5 }}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& fieldset": {
                      borderColor: "#7c3aed",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7c3aed",
                },
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& fieldset": {
                      borderColor: "#7c3aed",
                    },
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7c3aed",
                },
              }}
            />

            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#683DB3",
                ":hover": { bgcolor: "#7c3aed" },
                color: "#FFFFFF",
                px: 11,
                py: 1.5,
                fontSize: 15,
                borderRadius: 1,
              }}
            >
              Login
            </Button>
            <Typography textAlign={"center"}>
              No account?{" "}
              <Link to="/register">
                <Typography variant="span">Create one</Typography>
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
