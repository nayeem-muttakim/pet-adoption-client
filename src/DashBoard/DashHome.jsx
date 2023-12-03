import { Box, Grid, Typography } from "@mui/material";
import useAuth from "../Hooks/useAuth";
import dash from '/dashboard.svg'

const DashHome = () => {
   const{user}=useAuth()
    return (
        <Grid my={5} px={3} textAlign={"center"}>
            <Typography variant="h4" color={'#d4a373'}>{`Welcome To Dashboard ${user.displayName}`}</Typography>
            <Box component={'img'} src={dash} sx={{maxHeight:600,maxWidth:600 }}/>
        </Grid>
    );
};

export default DashHome;