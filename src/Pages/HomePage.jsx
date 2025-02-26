import { Grid } from "@mui/material";
import AboutUs from "../components/AboutUs/AboutUs";

import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import Volunteer from "../components/Volunteer";
import FeedBack from "../components/FeedBack";
import Encourage from "../components/Encourage/Encourage";

const HomePage = () => {
  return (
    <Grid display={"grid"}>
      <Helmet>
        <title>FurNest</title>
      </Helmet>
      <Banner />
      <Encourage />
      <AboutUs />
      <Volunteer />
      <FeedBack />
    </Grid>
  );
};

export default HomePage;
