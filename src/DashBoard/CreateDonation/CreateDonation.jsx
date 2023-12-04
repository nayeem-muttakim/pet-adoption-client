import { Form, Formik } from "formik";

import { Grid, Paper, TextField, Typography } from "@mui/material";

import { imageUpload } from "../../api/utils";
import { Button, Textarea } from "@mui/joy";
import { useState } from "react";
import moment from "moment/moment";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";

const CreateDonation = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const time = moment().format("DD/MM/YYYY,h:mm a");
  const [isError, setIsError] = useState("");
  const [error, setError] = useState("");

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
          Create Donation Campaign
        </Typography>
      </Paper>
      <Formik
        initialValues={{
          pet_image: "",
          max_donation: "",
          pet_name: "",
          last_date: "",
          donation_requirement: "",
          short_description: "",
          long_description: "",
        }}
        onSubmit={async (values) => {
          const imageData = await imageUpload(values.pet_image);

          const campaignInfo = {
            pet_image: imageData?.data?.display_url,
            max_donation: values.max_donation,
            pet_name: values.pet_name,
            last_date: values.last_date,
            short_description: values.short_description,
            long_description: values.long_description,
            created_on: time,
            creator: user.email,
            pause: false,
            donation_requirement: values.donation_requirement,
          };
          if (values.max_donation <= "0") {
            setIsError("Value must be greater than 0");
            return;
          } else if (values.donation_requirement <= "0") {
            setError("Value must be greater than 0");
          } else {
            setIsError("");
            setError("");
            axiosSecure
              .post("/campaigns", campaignInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    title: "Success",
                    text: `Campaign Created`,
                    icon: "success",
                  });
                }
                location.reload();
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
              type="text"
              label="Pet Name"
              required
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_name", event.target.value);
              }}
            />
            <TextField
              name="max_donation"
              type="number"
              required
              label="Maximum Donation Amount"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("max_donation", event.target.value);
              }}
            />
            <Typography color={"red"}>{isError}</Typography>
            <TextField
              name="donation_requirement"
              type="number"
              required
              label="Donation Requirement"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue(
                  "donation_requirement",
                  event.target.value
                );
              }}
            />
            <Typography color={"red"}>{error}</Typography>

            <Typography variant="body1">Last Date of Donation</Typography>
            <TextField
              name="last_date"
              type="date"
              required
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("last_date", event.target.value);
              }}
            />

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
export default CreateDonation;
