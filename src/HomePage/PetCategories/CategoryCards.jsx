import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";


const CategoryCards = ({pets}) => {
    return (
        <Grid>
            <Card sx={{ maxWidth: 345,mx:"auto" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={pets.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                   textAlign={"center"}
               variant="h5" component="div">
                  {pets.name}
                  
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
    );
};

export default CategoryCards;