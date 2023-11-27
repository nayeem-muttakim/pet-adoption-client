import { Grid } from "@mui/material";
import Banner from "./Banner/Banner";
import PetCategories from "./PetCategories/PetCategories";
import AboutUs from "./AboutUs/AboutUs";
import Encourage from "./Encourage/Encourage";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <Grid>
      <Helmet>
        <title>Pet Adoption</title>
      </Helmet>
      <Banner />
      <PetCategories />
      <Encourage />
      <AboutUs />
    </Grid>
  );
};

export default HomePage;
