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
import { useEffect, useMemo, useState } from "react";
import { Button, IconButton } from "@mui/joy";
import { AutoFixNormal, DeleteForever } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCampaigns = () => {
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [donor, setDonor] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const axiosSecure = useAxiosSecure();
  const { data: myCampaigns = [], refetch } = useQuery({
    queryKey: [user?.email, "myCampaigns"],
    queryFn: async () => {
      const res = await axiosSecure(`/campaigns/mine?creator=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    axiosSecure("/donations").then((res) => {
      const mine = res.data.filter(
        (my) => my?.campaign?.creator === user?.email
      );
      setDonors(mine);
    });
  }, [axiosSecure, user]);

  const handleOpen = (camp) => {
    setOpen(true);
    const donor = donors.filter(don=>don.campaign._id === camp._id)
    setDonor(donor)
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const data = useMemo(() => myCampaigns, []);
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
      header: "Donators",
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
          Created : {myCampaigns.length}
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
            {myCampaigns.map((campaign, index) => (
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
                    <Button
                      onClick={() => handleOpen(campaign)}
                      sx={{ bgcolor: "#ccd5ae", color: "black" }}
                    >
                      View
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                       <Table>
                        <TableHead>
                          <TableRow>
                            <th>Serial</th>
                            <th>Donor's Email</th>
                            <th>Amount</th>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {donor.map((don,index)=>(
                            <TableRow sx={{py:2}} key={don?._id}>
                              <th>{index + 1}</th>
                              <th>{don?.email}</th>
                              <th>${don?.amount}</th>
                            </TableRow>
                          ))}
                        </TableBody>
                       </Table>
                      </Box>
                    </Modal>
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

export default MyCampaigns;
