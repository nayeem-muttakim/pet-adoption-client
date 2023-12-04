import React from "react";
import { Form, useParams } from "react-router-dom";

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
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 2,
  py: 4,
};

export default function CampaignDetail() {
  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: campaign = {} } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const res = await axiosSecure(`/campaign/${id}`);
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDonate = (e) => {
    e.preventDefault();
  };
  return (
    <Grid py={4} px={1} bgcolor={"#a3b18a"}>
      <Card
        sx={{ maxWidth: 900, mx: "auto", my: 5, px: 1, bgcolor: "#fefae0" }}
      >
        <CardHeader
          title={campaign?.pet_name}
          subheader={`Maximum Donation : ${campaign?.max_donation}`}
        />
        <CardMedia
          component="img"
          height="500"
          image={campaign?.pet_image}
          alt=""
        />
        <CardContent>
          <Typography variant="body1">{campaign?.short_description}</Typography>
          <Typography variant="body1">
            Last Date : {campaign?.last_date}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* donate */}
          {!campaign?.pause ? (
            <Button color="warning" onClick={handleOpen}>
              Donate
            </Button>
          ) : (
            <Button disabled>Donate</Button>
          )}
          {/* transaction  */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}></Box>
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
    </Grid>
  );
}
