import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
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
import useAxios from "../../hooks/useAxios";

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  maxWidth: 400,
  mx: "auto",
  bgcolor: "background.paper",
  px: 2,
  py: 4,
  borderRadius: 2,
  my: "25%",
};

export default function PetDetails() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const { data: pet = {} } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const res = await axiosPublic(`/pet/${id}`);
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (!user) navigate("/login");

    setOpen(true);
  };
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
    axiosPublic.post("/pets/adoptions", adoption_req).then((res) => {
      if (res.data.insertedId) {
        toast.success("Adoption Request Sent");
      }
    });
  };

  return (
    <Grid p={1}  bgcolor={"#F0EAF3"} height={"93vh"}>
      <Card
        sx={{ maxWidth: 650, mx: "auto", my: 5, px: 1, bgcolor: "#ffffff" }}
      >
        <CardHeader
          title={pet?.pet_name}
          subheader={`Location : ${pet?.pet_location}`}
        />
        <CardMedia component="img" height="400" image={pet?.pet_image} alt="" />
        <CardContent>
          <Typography variant="body1">{pet?.short_description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* adopt */}
          <Button color="success" onClick={handleOpen}>
            Adopt
          </Button>
          {/* modal form */}
          <Modal open={open} onClose={handleClose} sx={{ px: 1 }}>
            <Box sx={style}>
              <form onSubmit={handleAdopt}>
                <TextField
                  name="name"
                  type="text"
                  label="Name"
                  defaultValue={user?.displayName}
                  sx={{
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
                />
                <TextField
                  name="email"
                  defaultValue={user?.email}
                  label="Email"
                  type="text"
                  sx={{
                    width: "100%",
                    my: 2,
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
                />
                <TextField
                  name="phone"
                  label="Phone Number"
                  type="number"
                  required
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
                />
                <TextField
                  name="address"
                  label="Address"
                  required
                  type="text"
                  sx={{
                    width: "100%",
                    my: 2,
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
                />
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    bgcolor: "#7c3aed",
                    ":hover": { bgcolor: "#683DB3" },
                  }}
                >
                  Submit
                </Button>
              </form>
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
