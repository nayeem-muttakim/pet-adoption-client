import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function DonationCard({ mine ,refetch}) {
  const axiosSecure = useAxiosSecure();
  const handleDelete = (donation) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want Refund?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation/${donation._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Successful",
              text: `You Will receive your money shortly`,
              icon: "success",
            });
             refetch()
          }
        });
      }
    });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="200"
        image={mine?.campaign?.pet_image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {mine?.campaign?.pet_name}
        </Typography>
        <Typography variant="h6">Donated Amount : ${mine?.amount}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleDelete(mine)} size="medium">
          Ask For Refund
        </Button>
      </CardActions>
    </Card>
  );
}
