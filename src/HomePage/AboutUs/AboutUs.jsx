import { Box, Grid, Paper, Typography } from "@mui/material";
import Work from "./Work";
import Exist from "./Exist";

const AboutUs = () => {
  return (
    <Grid my={3}>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          mx: "auto",
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          About Us
        </Typography>
      </Paper>
      <Grid>
        <Typography
          variant="body1"
          textAlign={"center"}
          fontWeight={600}
          my={2}
          maxWidth={600}
          mx={"auto"}
        >
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
              my={2}
              variant="h6"
              fontWeight={500}
              textAlign={"center"}
              sx={{ backgroundColor: "#ccd5ae" }}
              width={"fit-content"}
              mx={"auto"}
              px={1}
              borderRadius={2}
            >
              How the Website Works
            </Typography>
            <Work />
          </Box>

          <Box>
            <Typography
              my={1}
              variant="h6"
              textAlign={"center"}
              sx={{ backgroundColor: "#ccd5ae" }}
              width={"fit-content"}
              mx={"auto"}
              px={1}
              borderRadius={2}
            >
              Why it Exists
            </Typography>
            <Exist />
          </Box>
        </Grid>
        <Typography 
        variant="body1"
          textAlign={"center"}
          fontWeight={600}
          my={2}
          maxWidth={600}
          mx={"auto"}>
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
