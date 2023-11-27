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
          <Grid
            display={"flex"}
            gap={1}
            px={1}
            textAlign={"center"}
            flexDirection={"column"}
          >
            <Typography variant="h5"> Pet Adoption </Typography>
            <Typography color={"black"}>
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
         
          <Grid
            display={"flex"}
            gap={1}
            px={1}
            textAlign={"center"}
            flexDirection={"column"}
          >
            <Typography variant="h5">Donation Campaigns</Typography>
            <Typography color={"black"}>
              {" "}
              Join us in making a difference by supporting our donation
              campaigns. These campaigns are designed to raise funds for
              veterinary care, shelter, and other essential needs of pets
              awaiting adoption. Every contribution, no matter how small, plays
              a crucial role in ensuring these animals receive the care they
              deserve.
            </Typography>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Grid
            display={"flex"}
            gap={1}
            px={1}
            
            textAlign={"center"}
            flexDirection={"column"}
          >
            <Typography variant="h5">Easy Navigation</Typography>
            <Typography  color={"black"}>
              {" "}
              Our user-friendly interface ensures a seamless experience. Filter
              your search based on preferences, such as pet category, and
              name. The adoption process is streamlined, allowing you to
              connect with shelters and rescue organizations effortlessly.
            </Typography>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
