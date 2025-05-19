import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EncourageCard from "./EncourageCard";

const inspirations = [
  {
    id: "1",
    text: "Give a homeless pet a second chance at love. Your kindness can change a life forever.",
    image:
      "https://img.freepik.com/premium-vector/adopt-pet-concept_23-2148517279.jpg",
  },
  {
    id: "2",
    text: "Discover the joy of a wagging tail and a purring friend. Adopt a pet and unlock a world of unconditional love.",
    image:
      "https://img.freepik.com/premium-vector/cat-dog-phrase-colorful-poster-inspirational-quotes-about-cat-dog-domestical-pets-hand-written-phrases-poster-cat-dog-adoption-lettering-adopt-cat-dog_317038-547.jpg",
  },
  {
    id: "3",
    text: "Open your heart and home to a furry companion. The happiness they bring is a lifelong gift.",
    image:
      "https://img.freepik.com/premium-vector/dog-phrase-colorful-poster-inspirational-quotes-about-dogs-hand-written-phrases-about-dog-adoption-adopt-dog-saying-about-dogs_317038-592.jpg?w=2000",
  },
  {
    id: "4",
    text: "In the journey of life, a pet is the perfect travel companion. Adopt, and let the adventure begin!",
    image:
      "https://img.freepik.com/free-vector/adopt-pet-concept-message-with-cute-dog_23-2148512838.jpg?t=st=1740317273~exp=1740320873~hmac=1184eae78874630066ccf7ff3f702d175b3323150f987961d4d56d3969743bfd&w=740",
  },
  {
    id: "5",
    text: "The warmth of a pet's love is unmatched. Adopt today and welcome boundless joy into your home.",
    image:
      "https://img.freepik.com/premium-vector/dogs-never-lie-about-love_749935-2302.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais",
  },
  {
    id: "6",
    text: "Experience the magic of a pet's companionship. Adopt, and create memories that last a lifetime.",
    image:
      "https://i.pinimg.com/736x/9c/ea/fe/9ceafe3d35fb3310a3e12c675aa0ed6f.jpg",
  },
];

const Encourage = () => {

  return (
    <Grid my={1} maxWidth={"lg"} mx={"auto"}>
      <Paper
        sx={{
          px: 3,
          py: 1,
          my: 2,
          bgcolor: "#7c3aed",
          color: "#ffffff",
          textAlign: "center",
          width: "fit-content",
          mx: "auto",
        }}
        elevation={2}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h5">
          Adopt A Life
        </Typography>
      </Paper>
      <Grid
        maxWidth={1200}
        mx={"auto"}
        display={"grid"}
        columnGap={3}
        rowGap={3}
        px={2}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
      >
        {inspirations.map((inspire) => (
          <EncourageCard inspire={inspire} key={inspire._id} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Encourage;
