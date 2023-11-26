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
import { Link } from "react-router-dom";
import gitLogo from "/Github.png";
import ggLogo from "/google.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values,null,2))
      console.log(values);
    },
  });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Grid sx={{ maxWidth: 600, mx: "auto", my: 10 }}>
      <Grid border={1}>
        {/* Email Pass Login */}
        <Grid>
          {" "}
          <Typography pl={5} pt={2} variant="h4">
            Create an account
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
            <TextField
              sx={{ width: { xs: 220, sm: "auto" } }}
              label="Full Name"
              variant="standard"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Picture
              <VisuallyHiddenInput required type="file" />
            </Button>
            <TextField
              sx={{ width: { xs: 220, sm: "auto" } }}
              label="Email"
              variant="standard"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />

            <TextField
              sx={{ width: { xs: 220, sm: "auto" } }}
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
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={{ xs: 3, sm: 13 }}
          border={1}
          mx={{ xs: 2, sm: 5 }}
          mb={2}
          px={1}
          py={1}
          borderRadius={12}
        >
          <Avatar src={ggLogo}></Avatar>
          <Typography variant="h6">Continue With Google</Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={{ xs: 3, sm: 13 }}
          border={1}
          mx={{ xs: 2, sm: 5 }}
          px={1}
          py={1}
          borderRadius={12}
        >
          <Avatar src={gitLogo}></Avatar>
          <Typography variant="h6">Continue With Github</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
