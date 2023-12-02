import { Form, Formik } from "formik";

import { Grid, Paper, TextField, Typography } from "@mui/material";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import { Button, Textarea } from "@mui/joy";

import moment from "moment/moment";

import useAxiosSecure from "../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UpdatePet = () => {
  const { id } = useParams();
  const { data: pet = {} } = useQuery({
    queryKey: [id, "pet"],
    queryFn: async () => {
      const res = await axiosSecure(`/pet/${id}`);
      return res.data;
    },
  });
  const name = pet.pet_name;
  const image = pet.pet_image;
  const age = pet.pet_age;
  const category = pet.pet_category;
  const petLocation = pet.pet_location;
  const short = pet.short_description;
  const long = pet.long_description;

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
  const [isError, setIsError] = useState("");

  return (
    <Grid px={1}>
      <Paper
        square={false}
        sx={{
          width: "fit-content",
          px: 4,
          py: 2,
          my: 2,
          mx: "auto",
          backgroundColor: "#ccd5ae",
        }}
        elevation={3}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4">
          {`Update ${name}`}
        </Typography>
      </Paper>
      <Formik
        initialValues={{
          pet_image: "",
          pet_name: "",
          pet_age: "",
          pet_location: "",
          pet_category: "",
          short_description: "",
          long_description: "",
        }}
        onSubmit={async (values) => {
          // image update given
          if (values.pet_image) {
            const imageData = await imageUpload(values.pet_image);
                // pet age not updated
            if (!values.pet_age) {
              const petInfo = {
                pet_image:imageData?.data?.display_url,
                pet_name: values.pet_name || name,
                pet_age: age,
                pet_location: values.pet_location || petLocation,
                pet_category: selectedOption || category,
                short_description: values.short_description || short,
                long_description: values.long_description || long,
                updated_time: time,
              };

              axiosSecure
                .patch(`/pet/${id}`, petInfo)
                .then((res) => {
                  if (res.data.modifiedCount) {
                    Swal.fire({
                      title: "Success",
                      text: `${name} Updated`,
                      icon: "success",
                    });
                  }
                   location.reload()
               
                })
                .catch((err) => {
                  console.log(err);
                });
            } 
            // pet age updated
            else {
              const petInfo = {
                pet_image:imageData?.data?.display_url,
                pet_name: values.pet_name || name,
                pet_age: values.pet_age,
                pet_location: values.pet_location || petLocation,
                pet_category: selectedOption || category,
                short_description: values.short_description || short,
                long_description: values.long_description || long,
                updated_time: time,
              };
              if (values.pet_age <= "0") {
                setIsError("Age must be more than 0");

                return;
              } else {
                setIsError("");
                axiosSecure
                  .patch(`/pet/${id}`, petInfo)
                  .then((res) => {
                    if (res.data.modifiedCount) {
                      Swal.fire({
                        title: "Success",
                        text: `${name} Updated`,
                        icon: "success",
                      });
                    }
                       location.reload()
                   
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          } 
          // image not updated
          else {
            // pet age not updated
            if (!values.pet_age) {
              const petInfo = {
                pet_name: values.pet_name || name,
                pet_age: age,
                pet_location: values.pet_location || petLocation,
                pet_category: selectedOption || category,
                short_description: values.short_description || short,
                long_description: values.long_description || long,
                updated_time: time,
              };

              axiosSecure
                .patch(`/pet/${id}`, petInfo)
                .then((res) => {
                  if (res.data.modifiedCount) {
                    Swal.fire({
                      title: "Success",
                      text: `${name} Updated`,
                      icon: "success",
                    });
                  }

                location.reload()
                })
                .catch((err) => {
                  console.log(err);
                });
            } 
            // pet age updated
            else {

              const petInfo = {
                pet_name: values.pet_name || name,
                pet_age: values.pet_age,
                pet_location: values.pet_location || location,
                pet_category: selectedOption || category,
                short_description: values.short_description || short,
                long_description: values.long_description || long,
                updated_time: time,
              };
              if (values.pet_age <= "0") {
                setIsError("Age must be more than 0");

                return;
              } else {
                setIsError("");
                axiosSecure
                  .patch(`/pet/${id}`, petInfo)
                  .then((res) => {
                    if (res.data.modifiedCount) {
                      Swal.fire({
                        title: "Success",
                        text: `${name} Updated`,
                        icon: "success",
                      });
                    }

                    location.reload()
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }
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
            <TextField
              name="pet_image"
              type="file"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_image", event.target.files[0]);
              }}
            />
            <Typography
              color={"blueviolet"}
              px={2}
            >{`Current Image =${image}`}</Typography>
            <TextField
              defaultValue={name}
              name="pet_name"
              label="Pet Name"
              type="text"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_name", event.target.value);
              }}
            />
            <TextField
              defaultValue={age}
              name="pet_age"
              type="number"
              label="Pet Age"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_age", event.target.value);
              }}
            />
            <Typography color={"red"}>{isError}</Typography>

            <TextField
              defaultValue={petLocation}
              name="pet_location"
              type="text"
              label="Pet Location"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_location", event.target.value);
              }}
            />
            <Grid my={"auto"}>
              <Select
                placeholder="Pet Category"
                name="pet_category"
                options={options}
                onChange={setSelectedOption}
                defaultValue={category}
              />
            </Grid>
            <Textarea
              defaultValue={short}
              minRows={2}
              maxRows={3}
              name="short_description"
              placeholder="Short Description"
              variant="soft"
              onChange={(event) => {
                formProps.setFieldValue(
                  "short_description",
                  event.target.value
                );
              }}
            />
            <Textarea
              defaultValue={long}
              minRows={4}
              maxRows={5}
              name="long_description"
              placeholder="Detailed Description"
              variant="soft"
              onChange={(event) => {
                formProps.setFieldValue("long_description", event.target.value);
              }}
            />

            <Button
              sx={{
                bgcolor: "#ccd5ae",

                width: 300,
                mx: "auto",
                color: "black",
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
