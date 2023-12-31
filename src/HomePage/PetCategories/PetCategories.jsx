import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import CategoryCards from "./CategoryCards";

const PetCategories = () => {
  const [categories, setCategories] = useState([]);
  const axiosPublic = useAxios();

  useEffect(() => {
    axiosPublic("/categories").then((res) => {
      setCategories(res.data);
    });
  }, [axiosPublic]);

  return (
    <Grid my={3}>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          mb: 2,
          mx: "auto",
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          Pet Categories
        </Typography>
      </Paper>
      <Grid
        maxWidth={1200}
        mx={"auto"}
        display={"grid"}
        columnGap={2}
        rowGap={4}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
      >
        {" "}
        {categories?.map((pets) => (
          <CategoryCards key={pets._id} pets={pets} />
        ))}
      </Grid>
    </Grid>
  );
};

export default PetCategories;
