import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Form } from "react-router-dom";
import { Button } from "@mui/joy";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Select from "react-select";
import ListCard from "./ListCard";
const PetList = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [available, setAvailable] = useState([]);
  const initial = {
    value: "",
    label: "",
  };
  const [selectedOption, setSelectedOption] = useState(initial);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  const { data: Pets = [] } = useQuery({
    queryKey: ["Pets", search, selectedOption],
    queryFn: async () => {
      const res = await axiosSecure(
        `/pets?search=${search}&category=${selectedOption.value}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    const avail = Pets.filter((pet) => pet.adoption_status === false);
    setAvailable(avail);
  }, [Pets]);

  const options = [
    { value: "", label: "All" },
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Hamster", label: "Hamster" },
    { value: "Parrot", label: "Parrot" },
    { value: "Rabbit", label: "Rabbit" },
  ];

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

      <Grid maxWidth={700} mx={"auto"} display={"grid"} gap={1}>
        {/* search bar */}
        <Form onSubmit={handleSearch} style={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Search by Name"
            name="search"
            type="text"
          />
          <Button color="neutral" type="submit">
            {" "}
            <Search
              fontSize="large"
              sx={{ position: "absolute", left: -45, color: "black" }}
            />
            Search
          </Button>
        </Form>
        {/* category search */}
        <Grid my={"auto"}>
          <Select
            required
            placeholder="Search Category"
            name="pet_category"
            options={options}
            onChange={setSelectedOption}
          />
        </Grid>
      </Grid>
      {/* pets */}
      <Grid
        px={{ lg: 40 }}
        py={5}
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={2}
      >
        {available.map((pet) => (
          <ListCard key={pet._id} pet={pet} />
        ))}
      </Grid>
    </Grid>
  );
};

export default PetList;
