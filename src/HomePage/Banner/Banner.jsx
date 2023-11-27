import { Grid, Paper, Typography } from "@mui/material";
import banner from "/adoption.webp";

const Banner = () => {
  const styles = {
    heroContainer: {
      backgroundImage: `url(${banner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <Grid>
      <Grid
        width={"auto"}
        height={{ xs: 430, lg: 500, xl: 650 }}
        style={styles.heroContainer}
      >
        <Grid
          width={"auto"}
          height={{ xs: 430, lg: 500, xl: 650 }}
          sx={{ backgroundColor: "black", opacity: 0.5, zIndex: 15 }}
        ></Grid>
        <Grid>
          <Grid
            height={{ xs: 430, lg: 500, xl: 650 }}
            display="flex"
            gap={5}
            textAlign={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"white"}
            sx={{position:"relative", marginTop:{xs:-55,xl:-80}}}
          >
            <Typography variant="h3">Don't Shop,<br/> Adopt!</Typography>
            <Typography  variant="h5">Support Us,Your happiness is with them</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Banner;
