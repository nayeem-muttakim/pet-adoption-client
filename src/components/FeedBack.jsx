import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";

import toast from "react-hot-toast";

const FeedBack = () => {
  const handleFeedBack = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    if (feedback) {
      toast.success("Thanks For Your Feedback");
      e.target.reset();
    }
  };

  return (
    <Grid maxWidth={"lg"} mx={"auto"} py={2} px={1}>
      <Paper
        sx={{
          px: 3,
          py: 1,
          my: 2,
          bgcolor: "#7c3aed",
          color: "#ffffff",
          textAlign: "center",
          width: "fit-content",
          mx: "auto",
        }}
        elevation={2}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h5">
          Give Your FeedBack
        </Typography>
      </Paper>

      <form onSubmit={handleFeedBack}>
        <Grid display={"flex"}>
          <TextField
            minRows={2}
            name="feedback"
            type="text"
            multiline
            sx={{
              mx: 1,
              width: { xs: "full", sm: 600 },
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& fieldset": {
                    borderColor: "#7c3aed",
                  },
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#7c3aed",
              },
            }}
            required
            label="FeedBack"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#7c3aed",
              ":hover": { bgcolor: "#683DB3" },
              fontSize: 14,
            }}
          >
            <Send />
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default FeedBack;
