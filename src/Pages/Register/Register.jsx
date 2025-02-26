import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import SocialAuthentication from "../../Shared/SocialAuthentication";

const Register = () => {
  const { register, updateUser, user } = useAuth();
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
      await register(email, pass);
      // user name and image
      await updateUser(name, imageData?.data?.display_url);
      const userInfo = {
        name: name,
        email: email,
        image: imageData?.data?.display_url,
        role: "user",
      };
      await axiosPublic.post("/users", userInfo);

      toast.success("User Created", { id: toasted });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  if (user) navigate("/");
  return (
    <Grid
      px={2}
      display={"grid"}
      alignItems={"center"}
      height={"80vh"}
      sx={{ maxWidth: 400, mx: "auto", my: 10 }}
    >
      <Helmet>
        <title>FurNest | Register</title>
      </Helmet>

      <Grid>
        <Grid>
          {" "}
          <Typography variant="h5">Register</Typography>
          {/* social registration */}
          <SocialAuthentication />
          <Divider variant="middle">Or</Divider>
        </Grid>

        {/* email pass registration */}
        <form onSubmit={handleReg}>
          <Grid sx={{ display: "grid", gap: 3, py: 5 }}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              type="text"
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
              variant="outlined"
              name="image"
              type="file"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& fieldset": {
                      borderColor: "#7c3aed",
                    },
                  },
                },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
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
              Create Your Account
            </Button>
            <Typography textAlign={"center"}>
              Already have an account?{" "}
              <Link to="/login">
                <Typography variant="span">Login</Typography>
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
