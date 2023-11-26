import { Avatar, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import gitLogo from "/Github.png";
import ggLogo from "/google.png";

const Login = () => {
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
  return (
    <Grid   sx={{maxWidth:600,mx:"auto",my:10}}>
     <Grid border={1}>
      {/* Email Pass Login */}
      <Grid >  <Typography pl={5} pt={2}  variant="h4">Login</Typography></Grid>
     <form  onSubmit={formik.handleSubmit}>
     <Grid sx={{display:"grid",gap:5,p:5}}>
     <TextField
          
          sx={{width:{xs:220,sm:"auto"}}}
          label="Email"
          variant="standard"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />

        <TextField
         sx={{width:{xs:220,sm:"auto"}}}
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
            px: {xs:10,sm:19},
            py: 1,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Login
        </Button>
        <Typography>Don't have an account? <Link to="/register"><Typography variant="span" sx={{color:"#d4a373"}}>Create one</Typography></Link></Typography>
     </Grid>
      </form>
      
    {/* Additionals */}
    
     </Grid>
     <Divider sx={{mt:2}} orientation="horizontal" variant="middle" >Or</Divider>
     <Grid my={2}>
        <Box display={"flex"} alignItems={"center"} gap={{xs:3,sm:13}} border={1} mx={{xs:2,sm:5}} mb={2} px={1} py={1} borderRadius={12}>
          <Avatar src={ggLogo}></Avatar>
          <Typography variant="h6">Continue With Google</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={{xs:3,sm:13}} border={1} mx={{xs:2,sm:5}} px={1} py={1} borderRadius={12}>
          <Avatar src={gitLogo}></Avatar>
          <Typography variant="h6">Continue With Github</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
