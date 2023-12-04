import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

export default function CampaignCard({ camp }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={camp?.pet_image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {camp?.pet_name}
          </Typography>
          <Typography>
            Maximum Donation Amount : ${camp?.max_donation}
          </Typography>
          <Typography>Donated Amount : $</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/campaign/${camp?._id}`}>
          <Button variant="contained">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
