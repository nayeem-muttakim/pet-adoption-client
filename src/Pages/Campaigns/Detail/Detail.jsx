import React, { useEffect } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Button } from "@mui/joy";
import { Box, Grid, Modal, TextField } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

import Payment from "./Payment";
import ExtraCard from "./ExtraCard";
import useAxios from "../../../hooks/useAxios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CampaignDetail() {
  const [expanded, setExpanded] = useState(false);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [amount, setAmount] = useState(5);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxios();

  const { data: campaign = {}, refetch } = useQuery({
    queryKey: ["campaign", amount],
    queryFn: async () => {
      const res = await axiosPublic(`/campaign/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    axiosPublic("/campaigns").then((res) => {
      const activeCampaigns = res.data.filter((campaign) => !campaign.pause);
      const filtered = activeCampaigns.filter((e) => e._id !== id);

      const randomSelection = filtered
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setActiveCampaigns(randomSelection);
    });
    refetch();
  }, [axiosPublic, id]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (!user) navigate("/login");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid p={1} bgcolor={"#F0EAF3"}>
      <Card
        sx={{ maxWidth: 800, mx: "auto", my: 5, px: 1, bgcolor: "#ffffff" }}
      >
        <CardHeader
          title={campaign?.pet_name}
          subheader={`Maximum Donation : ${campaign?.max_donation}`}
        />
        <CardMedia component="img" image={campaign?.pet_image} alt="" />
        <CardContent>
          <Typography variant="body1">{campaign?.short_description}</Typography>
          <Typography variant="body1">
            Last Date : {campaign?.last_date}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* donate */}
          {!campaign?.pause ? (
            <Button color="success" onClick={handleOpen}>
              Donate
            </Button>
          ) : (
            <Button disabled>Donate</Button>
          )}
          {/* transaction  */}
          <Modal
            open={open}
            onClose={handleClose}
            sx={{ px: 1 }}
            disableScrollLock={true}
          >
            <Box
              sx={{
                maxWidth: 400,
                display: "grid",
                gap: 2,
                mx: "auto",
                bgcolor: "background.paper",
                p: 3,
                borderRadius: 2,
                my: { xs: "65%", sm: "30%", lg: "20%" },
              }}
            >
              <TextField
                defaultValue={5}
                label="Enter Amount"
                name="amount"
                type="number"
                onChange={(e) => setAmount(parseInt(e.target.value))}
                inputProps={{ min: 1 }}
                sx={{
                  "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused": {
                      "& fieldset": {
                        borderColor: "#7c3aed",
                      },
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#7c3aed",
                  },
                }}
              />{" "}
              <Payment
                handleClose={handleClose}
                amount={amount}
                campaign={campaign}
              />
            </Box>
          </Modal>
          {/* details */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{campaign?.long_description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Grid>
        <Typography color={"#7c3aed"} variant="h4" textAlign={"center"}>
          More Active Campaigns
        </Typography>
        <Grid
          px={{ lg: 45 }}
          py={5}
          display={"grid"}
          gridTemplateColumns={{
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={1.5}
        >
          {activeCampaigns.map((active) => (
            <ExtraCard key={active._id} active={active} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
