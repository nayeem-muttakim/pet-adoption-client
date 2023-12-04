import React, { useEffect } from "react";
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
import Payment from "./Payment";
import ExtraCard from "./ExtraCard";

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

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 2,
  py: 4,
};

export default function CampaignDetail() {
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState([]);
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: campaign = {} } = useQuery({
    queryKey: ["campaign", amount],
    queryFn: async () => {
      const res = await axiosSecure(`/campaign/${id}`);
      return res.data;
    },
  });
  useEffect(() => {
    axiosSecure("/campaigns").then((res) => {
      const active = res.data.filter((act) => act.pause === false);
      const more = active.filter((e) => e._id !== id).slice(0,3);
      setActive(more);
    });
  }, [axiosSecure, id]);

  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAmount = (e) => {
    e.preventDefault();
    const amount = e.target?.amount.value;
    if (amount <= "0") {
      setError("Amount must be more than 0");
      return;
    }
    setAmount(parseInt(amount));
    setError("");
    setShow(true);
  };

  return (
    <Grid py={2} px={1} bgcolor={"#a3b18a"}>
      <Card
        sx={{ maxWidth: 900, mx: "auto",my:5,  px: 1, bgcolor: "#fefae0" }}
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
            <Box minWidth={{ xs: 300, sm: 400 }} sx={style}>
              <Form
                onSubmit={handleAmount}
                style={{ marginBottom: 6, display: "flex", gap: 2 }}
              >
                <TextField
                  defaultValue={1}
                  label="Enter Amount"
                  name="amount"
                  type="number"
                />
                <Typography color={"red"}>{error}</Typography>
                <Button type="submit">Next</Button>
              </Form>
              {show && (
                <Payment
                  setShow={setShow}
                  amount={amount}
                  campaign={campaign}
                />
              )}
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
        <Typography color={"whitesmoke"} variant="h4" textAlign={"center"}>
          More Active Campaigns
        </Typography>
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
          {active.map(act=><ExtraCard key={act._id} act={act}/>)}
        </Grid>
      </Grid>
    </Grid>
  );
}
