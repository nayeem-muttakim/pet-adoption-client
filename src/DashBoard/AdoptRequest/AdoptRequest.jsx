import {
  Avatar,
  Grid,
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

const AdoptRequest = () => {
  const petPerPage = 10;
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch } = useQuery({
    queryKey: [user?.email, "requests"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/pets/adoptions/mine?lister=${user?.email}&`
      );
      return res.data;
    },
  });

  const data = useMemo(() => requests, []);
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = [
    { header: "Serial" },
    {
      header: "Name",
    },
    {
      header: "Email",
    },
    {
      header: "Phone Number",
    },
    {
      header: "Location",
    },
    {
      header: "Status",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleAccept = (req) => {
    axiosSecure
      .patch(`/pets/adoption/${req._id}`, {
        req_status: true,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Successful",
            text: `Request Approved`,
            icon: "success",
          });
        }
      });
  };
  const handleDelete = (req) => {
    axiosSecure
      .patch(`/pets/adoption/${req._id}`, {
        req_status: false,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Successful",
            text: `Request Declined`,
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
          Requests : {requests.length}
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
            {requests.map((req) => (
              <>
                <TableRow key={req._id}>
                  <th>{req?._id + 1}</th>
                  <th>{req?.customer_name}</th>
                  <th>{req?.customer_email}</th>
                  <th>{req?.phone}</th>
                  <th>{req?.address}</th>

                  <th>
                    {req?.req_status ? (
                      <Button onClick={() => handleDelete(req)} color="danger">
                        Reject
                      </Button>
                    ) : (
                      <Button onClick={() => handleAccept(req)} color="warning">
                        Accept
                      </Button>
                    )}
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

export default AdoptRequest;
