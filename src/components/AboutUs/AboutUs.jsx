import { Box, Grid, Paper, Typography } from "@mui/material";
import Work from "./Work";
import Exist from "./Exist";

const AboutUs = () => {
  return (
    <Grid my={1} px={1} maxWidth={"lg"} mx="auto">
      <Paper
        sx={{
          px: 3,
          py: 1,
          my: 2,
          bgcolor: "#7c3aed",
          color: "#ffffff",
          textAlign: "center",
          width: "fit-content",
          mx: "auto",
        }}
        elevation={2}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h5">
          About Us
        </Typography>
      </Paper>
      <Grid>
        <Typography variant="h6" textAlign={"center"} my={2}>
          Welcome to our pet adoption and donation platform, where compassion
          meets connection. Our website is dedicated to facilitating the
          adoption of lovable pets in need of forever homes while also running
          campaigns to raise funds for their well-being.
        </Typography>
        {/* how the website works and why it exists */}
        <Grid
          display={"grid"}
          gridTemplateColumns={{ xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" }}
          gap={2}
        >
          <Box>
            <Typography
              my={1.5}
              variant="h6"
              sx={{ bgcolor: "#7c3aed",color: "#ffffff", }}
              width={"fit-content"}
              mx={"auto"}
              px={1}
              borderRadius={1}
            >
              How the Website Works
            </Typography>
            <Work />
          </Box>

          <Box>
            <Typography
              my={1.5}
              variant="h6"
              textAlign={"center"}
              sx={{ bgcolor: "#7c3aed",color: "#ffffff", }}
              width={"fit-content"}
              mx={"auto"}
              px={1}
              borderRadius={1}
            >
              Why it Exists
            </Typography>
            <Exist />
          </Box>
        </Grid>
        <Typography variant="h6" textAlign={"center"} my={2}>
          Join us on this compassionate journey, where every click, share, and
          donation brings us one step closer to a world where every pet is loved
          and cared for. Together, we can make tails wag, purrs resonate, and
          create lasting bonds between pets and their forever families.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
