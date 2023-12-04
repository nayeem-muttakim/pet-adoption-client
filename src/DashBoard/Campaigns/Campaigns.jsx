import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button, IconButton } from "@mui/joy";
import { AutoFixNormal, DeleteForever} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Campaigns = () => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const axiosSecure = useAxiosSecure();
  const { data: Campaigns = [], refetch } = useQuery({
    queryKey: ["Campaigns"],
    queryFn: async () => {
      const res = await axiosSecure(`/campaigns`);
      return res.data;
    },
  });

  const data = useMemo(() => Campaigns, []);
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = [
    { header: "Serial" },
    {
      header: "Name",
    },
    {
      header: "Maximum Donation",
    },
    {
      header: "Donation Progress",
    },
    {
      header: "Pause",
    },
    {
      header: "Edit",
    },
    {
      header: "Delete",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handlePause = (campaign) => {
    axiosSecure
      .patch(`/campaign/${campaign._id}`, {
        pause: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Successful",
            text: `Campaign  Paused`,
            icon: "success",
          });
        }
      });
  };
  const handleResume = (campaign) => {
    axiosSecure
      .patch(`/campaign/${campaign._id}`, {
        pause: false,
      })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Successful",
            text: `Campaign Resumed  `,
            icon: "success",
          });
        }
      });
  };
  const handleDelete = (campaign) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/campaign/${campaign._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted",
              text: `Campaign  Deleted`,
              icon: "error",
            });
          }
        });
      }
    });
  };
  return (
    <Grid className="w3-container">
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
          Total : {Campaigns.length}
        </Typography>
      </Paper>

      <Grid className="w3-responsive">
        <Table className="w3-table-all">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {Campaigns.map((campaign, index) => (
              <>
                <TableRow key={campaign._id}>
                  <th>{index + 1}</th>
                  <th>{campaign?.pet_name}</th>
                  <th>{campaign?.max_donation}</th>

                  <th>
                    <LinearProgress />
                  </th>
                  <th>
                    {" "}
                    {campaign?.pause ? (
                      <Button
                        onClick={() => handleResume(campaign)}
                        color="danger"
                      >
                        Unpause
                      </Button>
                    ) : (
                      <Button onClick={() => handlePause(campaign)}>
                        Pause
                      </Button>
                    )}
                  </th>
                  <th>
                    <Link to={`/dashboard/update-campaign/${campaign?._id}`}>
                      {" "}
                      <IconButton color="warning">
                        <AutoFixNormal fontSize="large" />
                      </IconButton>
                    </Link>
                  </th>
                  <th>
                    {" "}
                    <IconButton onClick={() => handleDelete(campaign)} color="danger">
                    <DeleteForever fontSize="large" />
                  </IconButton>
                 
                  </th>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Campaigns;
