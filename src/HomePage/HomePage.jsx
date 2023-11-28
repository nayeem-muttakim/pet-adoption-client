import { Grid } from "@mui/material";
import Banner from "./Banner/Banner";
import PetCategories from "./PetCategories/PetCategories";
import AboutUs from "./AboutUs/AboutUs";
import Encourage from "./Encourage/Encourage";
import { Helmet } from "react-helmet-async";
import FeedBack from "./Feedback/FeedBack";
import Volunteer from "./Volunteer/Volunteer";

const HomePage = () => {
  return (
    <Grid display={'grid'} gap={4}>
      <Helmet>
        <title>Pet Adoption</title>
      </Helmet>
      <Banner />
      <PetCategories />
      <Encourage />
      <AboutUs />
      <Volunteer/>
      <FeedBack/>
    </Grid>
  );
};

export default HomePage;
