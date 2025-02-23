import { Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CampaignCard from "./CampaignCard";

const CampaignList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosSecure(`/campaigns`);
      return res.data;
    },
  });

  return (
    <Grid px={2} my={3}>
      <Helmet>
        <title>FurNest | Campaigns</title>
      </Helmet>
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
        <Typography
          textAlign={"center"}
          sx={{ fontWeight: "bold" }}
          variant="h4"
        >
          Campaigns
        </Typography>
      </Paper>

      <Grid maxWidth={700} mx={"auto"} display={"grid"} gap={1}></Grid>
      {/* campaigns */}
      <Grid
        px={{ lg: 40 }}
        py={5}
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={2}
      >
        {campaigns.map((camp) => (
          <CampaignCard key={camp._id} camp={camp} />
        ))}
      </Grid>
    </Grid>
  );
};

export default CampaignList;
