import { Grid, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Grid>
      <Grid
        height={{ xs: 430, lg: 500, xl: 650 }}
        sx={{
          backgroundImage: "linear-gradient(135deg,#7c3aed,#3b82f6)",
          position: "relative",
        }}
      ></Grid>
      <Grid
        height={{ xs: 520, lg: 700 }}
        display="flex"
        gap={5}
        textAlign={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <Typography variant="h3">
          Don't Shop,
          <br /> Adopt!
        </Typography>
        <Typography variant="h5">
          Support Us,Your happiness is with them
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Banner;
