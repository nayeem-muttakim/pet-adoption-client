import { Form, Formik } from "formik";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { imageUpload } from "../../../api/utils";
import { Button, Textarea } from "@mui/joy";
import moment from "moment/moment";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const UpdateCampaign = () => {
  const { id } = useParams();
    const axiosSecure = useAxiosSecure();
  const { data: campaign = {}, refetch } = useQuery({
    queryKey: [id, "campaign"],
    queryFn: async () => {
      const res = await axiosSecure(`/campaign/${id}`);
      return res.data;
    },
  });
  const name = campaign.pet_name;
  const image = campaign.pet_image;
  const max = campaign.max_donation;
  const requirement = campaign.donation_requirement;
  const last = campaign.last_date;
  const short = campaign.short_description;
  const long = campaign.long_description;



  const time = moment().format(" DD/MM/YYYY, h:mm a");
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
          {`Update ${name}`}
        </Typography>
      </Paper>
      <Formik
        initialValues={{
          pet_image: image,
          pet_name: name,
          max_donation: max,
          donation_requirement: requirement,
          last_date: last,
          short_description: short,
          long_description: long,
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
            updated_on: time,
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
              .patch(`/campaign/${id}`, campaignInfo)
              .then((res) => {
                if (res.data.modifiedCount) {
                  Swal.fire({
                    title: "Success",
                    text: `Campaign Updated`,
                    icon: "success",
                  });
                }
                refetch();
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
            <Typography
              color={"blueviolet"}
              px={2}
            >{`Current Image =${image}`}</Typography>
            <TextField
              name="pet_image"
              type="file"
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_image", event.target.files[0]);
              }}
            />

            <TextField
              name="pet_name"
              type="text"
              label="Pet Name"
              defaultValue={name}
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("pet_name", event.target.value);
              }}
            />
            <TextField
              name="max_donation"
              type="number"
              defaultValue={max}
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
              defaultValue={requirement}
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
              defaultValue={last}
              variant="outlined"
              onChange={(event) => {
                formProps.setFieldValue("last_date", event.target.value);
              }}
            />

            <Textarea
              minRows={2}
              maxRows={3}
              defaultValue={short}
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
              defaultValue={long}
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
export default UpdateCampaign;
