import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

export default function Volunteer() {
  return (
    <Grid px={1} maxWidth={"1200px"} mx={"auto"}>
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
          Become A Volunteer
        </Typography>
      </Paper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          },
          gap: 2,
        }}
      >
        <Card sx={{ minWidth: { md: 350 } }}>
          <CardContent>
            <Typography variant="h5" level="title-md">
              Send CV
            </Typography>
            <Typography variant="h6"> at petadoption@gmail.com </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: { md: 350 } }}>
          <CardContent>
            <Typography variant="h5" level="title-md">
              Contact Us
            </Typography>
            <Typography variant="h6"> 01760993821</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: { md: 350 } }}>
          <CardContent>
            <Typography variant="h5" level="title-md">
              {" "}
              Our FaceBook Page
            </Typography>
            <Typography variant="h6">FurNest</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: { md: 350 } }}>
          <CardContent>
            <Typography variant="h5" level="title-md" textColor="inherit">
              Twitter
            </Typography>
            <Typography variant="h6" textColor="inherit">
              @pet_adoption
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
