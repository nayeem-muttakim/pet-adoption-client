import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import { Form } from "react-router-dom";
import { Button } from "@mui/joy";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Select from "react-select";
import PetCard from "./PetCard";
import useAxios from "../../hooks/useAxios";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#7c3aed" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px #7c3aed" : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#7c3aed" : provided.borderColor,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#F0EAF3" : provided.backgroundColor,
    color: state.isFocused ? "#333" : provided.color,
    "&:hover": {
      backgroundColor: "#F0EAF3",
      color: "#333",
    },
  }),
};

const Pets = () => {
  const axiosPublic = useAxios();
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
      const res = await axiosPublic(
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
    <Grid px={2} my={1} maxWidth={"xl"} mx={"auto"}>
      <Helmet>
        <title>FurNest | Listing</title>
      </Helmet>
      <Grid maxWidth={"lg"} mx={"auto"} display={"grid"} gap={1}>
        <Paper
          sx={{
            px: 3,
            py: 1,
            my: 2,
            bgcolor: "#7c3aed",
            color: "#ffffff",
          }}
          elevation={2}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontWeight: "bold" }}
            variant="h5"
          >
            Pets
          </Typography>
        </Paper>
        {/* search bar */}
        <Form onSubmit={handleSearch} style={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Search Name"
            name="search"
            type="text"
            sx={{
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
          />
          <Button
            variant="outlined"
            sx={{
              borderColor: "gray",
              ":hover": { bgcolor: "#F0EAF3", borderColor: "#7c3aed" },
            }}
            type="submit"
          >
            {" "}
            <Search fontSize="large" sx={{ color: "#7c3aed" }} />
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
            styles={customStyles}
          />
        </Grid>
      </Grid>
      {/* pets */}
      <Grid
        px={{ lg: 17 }}
        py={5}
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={1}
      >
        {available.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Pets;
