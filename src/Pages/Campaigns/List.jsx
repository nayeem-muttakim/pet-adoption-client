import { Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import CampaignCard from "./Card";
import useAxios from "../../hooks/useAxios";

const CampaignList = () => {
  const axiosPublic = useAxios();

  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosPublic(`/campaigns`);
      return res.data;
    },
  });

  return (
    <Grid px={2} my={1} maxWidth={"xl"} mx={"auto"}>
      <Helmet>
        <title>FurNest | Campaigns</title>
      </Helmet>
      <Grid maxWidth={"lg"} mx={"auto"} display={"grid"} gap={1}>
        <Paper
          sx={{
            px: 3,
            py: 1,
            my: 2,
            bgcolor: "#7c3aed",
            color: "#ffffff",
          }}
          elevation={2}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontWeight: "bold" }}
            variant="h5"
          >
            Campaigns
          </Typography>
        </Paper>
        {/* campaigns */}
        <Grid
          py={5}
          display={"grid"}
          gridTemplateColumns={{
            xs: "repeat(1,1fr)",
            sm: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={2}
        >
          {campaigns.map((camp) => (
            <CampaignCard key={camp._id} camp={camp} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CampaignList;
