import { Grid, Paper, Typography } from "@mui/material";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import EncourageCard from "./EncourageCard";

const Encourage = () => {
  const axiosPublic = useAxios();
  const [inspire, setInspire] = useState([]);

  useEffect(() => {
    axiosPublic("/encourages").then((res) => setInspire(res.data));
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
      mx={'auto'}
        display={"grid"}
        columnGap={1}
        rowGap={4}
        px={2}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        
        }}
      >
        {inspire.map((ins) => (
          <EncourageCard ins={ins} key={ins._id} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Encourage;
