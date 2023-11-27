import { Grid } from "@mui/material";
import Banner from "./Banner/Banner";
import PetCategories from "./PetCategories/PetCategories";
import AboutUs from "./AboutUs/AboutUs";
import Encourage from "./Encourage/Encourage";


const HomePage = () => {
    return (
        <Grid>
            <Banner/>
            <PetCategories/>
            <Encourage/>
            <AboutUs/>
        </Grid>
    );
};

export default HomePage;