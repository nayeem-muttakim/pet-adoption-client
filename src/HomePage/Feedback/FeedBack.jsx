import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const FeedBack = () => {
  const handleFeedBack = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    if (feedback) {
      toast.success("Thanks For Your Feedback");
      e.target.reset();
    }

    console.log(feedback);
  };
  return (
    <Grid maxWidth={1200} mx={"auto"} py={2} px={1}>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          mb: 2,
          mx: "auto",
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography
          textAlign={"center"}
          sx={{ fontWeight: "bold" }}
          variant="h4"
        >
          Give Your FeedBack
        </Typography>
      </Paper>

      <form onSubmit={handleFeedBack}>
        <Grid display={"flex"}>
          <TextField
            minRows={2}
            name="feedback"
            type="text"
            fullWidth
            multiline
            sx={{ mx: 1, width: { xs: "full", sm: 600 },backgroundColor:"white" }}
            required
            label="FeedBack"
           
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#ccd5ae",
              color: "#023047",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "serif",
            }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default FeedBack;
