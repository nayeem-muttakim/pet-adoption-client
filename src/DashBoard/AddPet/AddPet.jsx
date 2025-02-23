import { Form, Formik } from "formik";

import { Grid, Paper, TextField, Typography } from "@mui/material";
import Select from "react-select";
import { imageUpload } from "../../api/utils";
import { Button, Textarea } from "@mui/joy";
import { useState } from "react";
import moment from "moment/moment";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const options = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Hamster", label: "Hamster" },
    { value: "Parrot", label: "Parrot" },
    { value: "Rabbit", label: "Rabbit" },
  ];
  const { user } = useAuth();
  const navigate = useNavigate();
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
          Add a Pet
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
          const imageData = await imageUpload(values.pet_image);

          const petInfo = {
            pet_image: imageData?.data?.display_url,
            pet_name: values.pet_name,
            pet_age: values.pet_age,
            pet_location: values.pet_location,
            pet_category: selectedOption,
            short_description: values.short_description,
            long_description: values.long_description,
            listed_time: time,
            lister_email: user.email,
            adoption_status: false,
          };
          if (values.pet_age <= "0") {
            setIsError("Age must be more than 0");
            return;
          } else {
            setIsError("");
            axiosSecure
              .post("/pets", petInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    title: "Success",
                    text: `Pet Added`,
                    icon: "success",
                  });
                }
                navigate("/dashboard/added-pets");
              })
              .catch((err) => {
                console.log(err);
              });
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
              required
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_image", event.target.files[0]);
              }}
            />
            <TextField
              name="pet_name"
              label="Pet Name"
              type="text"
              required
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_name", event.target.value);
              }}
            />
            <TextField
              name="pet_age"
              type="number"
              required
              label="Pet Age (Year)"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_age", event.target.value);
              }}
            />
            <Typography color={"red"}>{isError}</Typography>

            <TextField
              name="pet_location"
              type="text"
              required
              label="Pet Location"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_location", event.target.value);
              }}
            />
            <Grid my={"auto"}>
              <Select
                required
                placeholder="Pet Category"
                name="pet_category"
                options={options}
                onChange={setSelectedOption}
                defaultValue={selectedOption}
              />
            </Grid>
            <Textarea
              minRows={2}
              maxRows={3}
              required
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
              minRows={4}
              maxRows={5}
              required
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
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
export default AddPet;
