import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListCard({ pet }) {
  return (
    <Card sx={{ width: { xs: 280, sm: 345 }, mx: "auto", pb: 1,bgcolor:"#fefae0" }}>
      <CardMedia
        sx={{ height: 250 }}
        image={pet?.pet_image}
        title="green iguana"
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          Name : {pet?.pet_name}
        </Typography>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Typography variant="h6">Age : {pet?.pet_age}</Typography>
          <Typography variant="h6">Age : {pet?.pet_location}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Link to={`/pet-details/${pet?._id}`}>
          <Button sx={{bgcolor:"#ccd5ae",color:"black"}} variant="contained" size="small">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
