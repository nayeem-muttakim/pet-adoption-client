import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ExtraCard({ active }) {
  return (
    <Link to={`/campaign/${active?._id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, height: 320, mx: "auto" }}>
        <CardMedia component="img" height="200" image={active?.pet_image} />
        <CardContent>
          <Typography variant="h6">{active?.pet_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {active?.short_description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
