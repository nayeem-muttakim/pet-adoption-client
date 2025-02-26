import { Form, Formik } from "formik";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import { Button, Textarea } from "@mui/joy";
import moment from "moment/moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

const UpdatePet = () => {
  const { id } = useParams();
  const { data: pet = {}, refetch } = useQuery({
    queryKey: [id, "pet"],
    queryFn: async () => {
      const res = await axiosSecure(`/pet/${id}`);
      return res.data;
    },
  });
  const initialValues = {
    pet_name: pet.pet_name,
    pet_image: pet.pet_image,
    pet_age: pet.pet_age,
    pet_category: pet.pet_category,
    pet_location: pet.pet_location,
    short_description: pet.short_description,
    long_description: pet.long_description,
  };

  const options = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Hamster", label: "Hamster" },
    { value: "Parrot", label: "Parrot" },
    { value: "Rabbit", label: "Rabbit" },
  ];

  const axiosSecure = useAxiosSecure();
  const [selectedOption, setSelectedOption] = useState("");
  const time = moment().format(" DD/MM/YYYY, h:mm a");

  return (
    <Grid px={1} my={1}>
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
          sx={{ fontWeight: "bold" }}
          variant="h5"
          textAlign={"center"}
        >
          {`Update ${pet.pet_name}`}
        </Typography>
      </Paper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const imageData = await imageUpload(values.pet_image);

          const petInfo = {
            pet_image: imageData?.data?.display_url,
            pet_name: values.pet_name,
            pet_age: values.pet_age,
            pet_location: values.pet_location,
            pet_category: selectedOption,
            short_description: values.short_description,
            long_description: values.long_description,
            updated_time: time,
          };

          axiosSecure
            .patch(`/pet/${id}`, petInfo)
            .then((res) => {
              if (res.data.modifiedCount) {
                Swal.fire({
                  title: "Success",
                  text: `${pet.pet_name} Updated`,
                  icon: "success",
                });
              }
              refetch();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {(formProps) => (
          <Form
            style={{
              maxWidth: 750,
              marginTop: 50,
              margin: "auto",
              display: "grid",
              gap: 10,
            }}
          >
            <Avatar
              src={pet.pet_image}
              sx={{ mx: "auto", height: 60, width: 60 }}
            />

            <TextField
              name="pet_image"
              type="file"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_image", event.target.files[0]);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& fieldset": {
                      borderColor: "#7c3aed",
                    },
                  },
                },
              }}
            />
            <label>Name</label>
            <TextField
              defaultValue={pet.pet_name}
              placeholder={pet.pet_name}
              name="pet_name"
              type="text"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_name", event.target.value);
              }}
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

            <label>Age</label>
            <TextField
              defaultValue={pet.pet_age}
              placeholder={pet.pet_age}
              name="pet_age"
              type="number"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_age", event.target.value);
              }}
              inputProps={{ min: 0 }}
              sx={{
                "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                width: "100%",
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
            <label>Location</label>
            <TextField
              defaultValue={pet.pet_location}
              placeholder={pet.pet_location}
              name="pet_location"
              type="text"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_location", event.target.value);
              }}
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
            <label>Category </label>
            <Grid my={"auto"}>
              <Select
                name="pet_category"
                options={options}
                onChange={setSelectedOption}
                defaultValue={pet.pet_category}
                styles={customStyles}
              />
            </Grid>

            <label>Short Description</label>
            <Textarea
              minRows={2}
              maxRows={3}
              name="short_description"
              placeholder={pet.short_description}
              defaultValue={pet.short_description}
              onChange={(event) => {
                formProps.setFieldValue(
                  "short_description",
                  event.target.value
                );
              }}
            />

            <label>Long Description</label>
            <Textarea
              minRows={4}
              maxRows={5}
              name="long_description"
              placeholder={pet.long_description}
              defaultValue={pet.long_description}
              onChange={(event) => {
                formProps.setFieldValue("long_description", event.target.value);
              }}
            />

            <Button
              sx={{
                bgcolor: "#7c3aed",
                ":hover": { bgcolor: "#683DB3" },
                width: 300,
                mx: "auto",
                fontSize: { sm: 20 },
              }}
              type="submit"
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
export default UpdatePet;
