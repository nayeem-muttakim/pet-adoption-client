import { Grid, Paper, Typography } from "@mui/material";

const AboutUs = () => {
    return (
        <Grid my={3}>
            <Paper square={false}
        sx={{ width: "fit-content", px: 4, py: 2, mx: "auto", backgroundColor: "#ccd5ae" }}
        elevation={3}
      >
        <Typography sx={{fontWeight:'bold'}} variant="h4">About Us</Typography>
      </Paper>
          
        </Grid>
    );
};

export default AboutUs;