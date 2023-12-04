import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function ExtraCard({ act }) {
  return (
    <Link to={`/campaign/${act?._id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="200" image={act?.pet_image} />
          <CardContent>
            <Typography g variant="h5" component="div">
              {act?.pet_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {act?.short_description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
