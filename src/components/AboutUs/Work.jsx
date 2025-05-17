// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./work.css";

// import required modules
import { EffectCards } from "swiper/modules";
import { Grid, Typography } from "@mui/material";

export default function Work() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Grid display={"grid"} px={1} textAlign={"center"}>
            <Typography variant="h6"> FurNest </Typography>
            <Typography>
              {" "}
              Browse through profiles of adorable pets seeking a loving home.
              Our platform connects potential adopters with a diverse range of
              pets, from playful puppies to wise old cats. Each profile provides
              detailed information about the pet's personality, history, and any
              special needs.
            </Typography>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid display={"grid"} px={1} textAlign={"center"}>
            <Typography variant="h6">Donation Campaigns</Typography>
            <Typography>
              {" "}
              Join us in making a difference by supporting our donation
              campaigns. These initiatives help fund veterinary care, shelter,
              and essential needs for pets awaiting adoption. Every
              contribution, big or small, plays a crucial role in ensuring these
              animals receive the love and care they deserve
            </Typography>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Grid
            display={"flex"}
  
            px={1}
            textAlign={"center"}
            flexDirection={"column"}
          >
            <Typography variant="h6">Easy Navigation</Typography>
            <Typography>
              {" "}
              Our user-friendly interface ensures a seamless experience. Filter
              your search based on preferences, such as pet category, and name.
              The adoption process is streamlined, allowing you to connect with
              shelters and rescue organizations effortlessly.
            </Typography>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
