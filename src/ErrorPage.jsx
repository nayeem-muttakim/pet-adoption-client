import { Box, Button, Grid, Typography } from "@mui/material";
import errorSvg from "/undraw_page_not_found.svg";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <Grid
      sx={{
        display: "flex",
        gap: 5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <img src={errorSvg} alt="" />
      </Box>
      <Typography sx={{ display: { sm: "none" }, mt: 20 }} variant="h2">
        {error.status}
      </Typography>
      <Typography variant="p" sx={{ fontSize: 50, fontWeight: 500 }}>
        {error.statusText}
      </Typography>
      <Link>
        <Button
          variant="contained"
          sx={{
            px: 12,
            py: 2,
            backgroundColor: "#ccd5ae",
            color: "black",
            fontSize: 20,
          }}
        >
          HOME
        </Button>
      </Link>
    </Grid>
  );
};

export default ErrorPage;
