import React from "react";
import { Form, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
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

export default function PetDetails() {
  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: pet = {} } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const res = await axiosSecure(`/pet/${id}`);
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAdopt = (e) => {
    e.preventDefault();
    const customer_name = e.target?.name?.value || user?.displayName;
    const customer_email = e.target?.email?.value || user?.email;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    const adoption_req = {
      customer_name,
      customer_email,
      phone,
      address,
      req_status: false,
      lister: pet?.lister_email,
    };
    axiosSecure.post("/pets/adoptions", adoption_req).then((res) => {
      if (res.data.insertedId) {
        toast.success("Adoption Request Sent");
      }
    });
  };
  return (
    <Grid py={4} px={1} bgcolor={"#a3b18a"}>
      <Card
        sx={{ maxWidth: 900, mx: "auto", my: 5, px: 1, bgcolor: "#fefae0" }}
      >
        <CardHeader
          title={pet?.pet_name}
          subheader={`Locaton : ${pet?.pet_location}`}
        />
        <CardMedia component="img" height="500" image={pet?.pet_image} alt="" />
        <CardContent>
          <Typography variant="body1">{pet?.short_description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* adopt */}
          <Button color="warning" onClick={handleOpen}>
            Adopt
          </Button>
          {/* adoption form */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form onSubmit={handleAdopt} style={{ display: "grid", gap: 10 }}>
                <TextField
                  name="name"
                  type="text"
                  label="User Name"
                  defaultValue={user?.displayName}
                />
                <TextField
                  name="email"
                  defaultValue={user?.email}
                  label="Email"
                  type="text"
                />
                <TextField
                  name="phone"
                  label="Phone Number"
                  type="number"
                  required
                />
                <TextField
                  name="address"
                  label="Address"
                  required
                  type="text"
                />
                <Button type="submit" color="neutral">
                  Submit
                </Button>
              </Form>
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
            <Typography paragraph>Age : {pet?.pet_age}</Typography>
            <Typography paragraph>
              Category : {pet?.pet_category?.value}
            </Typography>

            <Typography paragraph>{pet?.long_description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
