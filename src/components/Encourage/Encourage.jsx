import { Grid, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import EncourageCard from "./EncourageCard";
import useAxios from "../../hooks/useAxios";

const Encourage = () => {
  const axiosPublic = useAxios();
  const [inspirations, setInspirations] = useState([]);

  useEffect(() => {
    axiosPublic("/encourages").then((res) => setInspirations(res.data));
  }, [axiosPublic]);

  return (
    <Grid my={3}>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          mx: "auto",
          mb: 2,
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
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
