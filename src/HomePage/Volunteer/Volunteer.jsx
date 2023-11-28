import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

export default function Volunteer() {
  return (
    <Grid px={1}>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          mb: 2,
          mx: "auto",
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography
          textAlign={"center"}
          sx={{ fontWeight: "bold" }}
          variant="h4"
        >
          Become A Volunteer
        </Typography>
      </Paper>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" level="title-md">Send CV</Typography>
            <Typography variant="body1"> at petadoption@gmail.com </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" level="title-md">Contact Us</Typography>
            <Typography variant="body1"> 01760993821</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" level="title-md"> Our FaceBook Page</Typography>
            <Typography>Pet Adoption</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" level="title-md" textColor="inherit">
              Solid card
            </Typography>
            <Typography variant="body1" textColor="inherit">
              Description of the card.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
