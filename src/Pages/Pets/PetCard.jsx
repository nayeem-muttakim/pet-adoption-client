import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function PetCard({ pet }) {
  return (
    <Card
      sx={{
        width: 270,
        mx: "auto",
        p: 1,
        bgcolor: "#F0EAF3",
        my: 1,
      }}
      variant="outlined"
    >
      <CardHeader
        title={pet?.pet_name}
        subheader={`Location : ${pet?.pet_location}`}
      />
      <CardMedia
        sx={{ height: 200, width: 200, borderRadius: 35, mx: "auto" }}
        image={pet?.pet_image}
        title={pet.pet_name}
      />

      <CardActions>
        <Link to={`/pet-details/${pet?._id}`}>
          <Button
            sx={{
              bgcolor: "#7c3aed",
              color: "#ffffff",
              ":hover": { bgcolor: "#683DB3" },
            }}
            variant="contained"
            size="medium"
          >
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
PetCard.propTypes = {
  pet: PropTypes.shape({
    pet_image: PropTypes.string.isRequired,
    pet_name: PropTypes.string.isRequired,
    pet_location: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
