import { Button, Divider, Grid, TextField, Typography } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import SocialAuthentication from "../../Shared/SocialAuthentication";

const Register = () => {
  const { register, updateUser } = useAuth();
  const axiosPublic = useAxios();
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
      const userInfo = {
        name: name,
        email: email,
        image: imageData?.data?.display_url,
        role: 'user',
      };
      await axiosPublic.post("/users", userInfo);

      toast.success("User Created", { id: toasted });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid px={1} sx={{ maxWidth: 600, mx: "auto", my: 10 }}>
      <Helmet>
        <title>Pet Adoption | Register</title>
      </Helmet>
      {/* Email Pass Login */}
      <Grid border={1}>
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
      <Divider sx={{ mt: 2 }} orientation="horiontal" variant="middle">
        Or
      </Divider>
      {/* social login */}
      <SocialAuthentication />
    </Grid>
  );
};

export default Register;
