import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PropTypes from "prop-types";

export default function EncourageCard({ inspire }) {
  return (
    <Card sx={{ maxWidth: 345, mx: "auto", maxHeight: 360 ,borderRadius:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250px"
          sx={{ objectFit: "inherit" }}
          image={inspire.image}
        />
        <CardContent>
          <Typography variant="body1">{inspire.text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

EncourageCard.propTypes = {
  inspire: PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
