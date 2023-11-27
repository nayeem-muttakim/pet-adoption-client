// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./work.css";

// import required modules
import { EffectCards } from "swiper/modules";
import { Grid, Typography } from "@mui/material";

export default function Exist() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <Grid
            display={"flex"}
            gap={1}
            px={1}
            textAlign={"center"}
            flexDirection={"column"}
          >
            <Typography variant="h5">Promoting Adoption</Typography>
            <Typography color={"black"}>
              {" "}
              By simplifying the adoption process, we aim to increase the number
              of pets finding forever homes. Adoption not only transforms the
              lives of animals but also enriches the lives of those who open
              their homes to them
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
            <Typography variant="h5">Caring for the Vulnerable</Typography>
            <Typography color={"black"}>
              {" "}
              The donation campaigns are a testament to our commitment to the
              welfare of all animals. Your support directly contributes to
              providing medical care, nourishment, and a secure environment for
              pets awaiting adoption.
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
            <Typography variant="h5">Building a Community</Typography>
            <Typography color={"black"}>
              {" "}
              Beyond being a platform, we aspire to create a community of animal
              lovers who share a common goal—creating a world where every pet is
              cherished. Through shared stories, updates, and campaigns, we
              foster a sense of unity among those dedicated to making a
              difference.
            </Typography>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
