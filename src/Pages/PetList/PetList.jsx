import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Form } from "react-router-dom";
import { Button } from "@mui/joy";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import Select from "react-select";
const PetList = () => {
  const axiosSecure = useAxiosSecure();
  const { data: Pets = [] } = useQuery({
    queryKey: ["Pets"],
    queryFn: async () => {
      const res = await axiosSecure("/pets");
      return res.data;
    },
  });
  const options = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Hamster", label: "Hamster" },
    { value: "Parrot", label: "Parrot" },
    { value: "Rabbit", label: "Rabbit" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <Grid px={2} my={3}>
      <Helmet>
        <title>Pet Adoption |Listing</title>
      </Helmet>
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
          Pet List
        </Typography>
      </Paper>

      <Grid maxWidth={700} mx={"auto"} display={'grid'} gap={1}>
        {/* search bar */}
        <Form style={{ display: "flex", gap: 2 }}>
          <TextField fullWidth label="Search by Name" name="search" type="text" />
          <Button color="neutral" type="submit">
            {" "}
            <Search
              fontSize="large"
              sx={{ position: "absolute", left: -45, color: "black" }}
            />
            Search
          </Button>
        </Form>
        <Grid my={"auto"}>
          <Select
            required
            placeholder="Search Category"
            name="pet_category"
            options={options}
            onChange={setSelectedOption}
            defaultValue={selectedOption}
          />
        </Grid>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default PetList;
