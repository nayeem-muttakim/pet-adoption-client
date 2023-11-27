
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function EncourageCard({ins}) {
  return (
    <Card  sx={{ maxWidth: 345 ,mx:"auto"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="fit-content"
          image={ins.image}
        
        />
        <CardContent>
     
          <Typography variant="body1" >
          {ins.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}