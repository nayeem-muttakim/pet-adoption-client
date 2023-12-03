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

const AddedPets = () => {
  const petPerPage = 10;
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const axiosSecure = useAxiosSecure();
  const { data: myAdded = [], refetch } = useQuery({
    queryKey: [user?.email, page, "myAdded"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/pets/mine?lister_email=${user?.email}&page=${page}&size=${petPerPage}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    axiosSecure
      .get(`/pets/mine/count?lister_email=${user?.email}`)
      .then((res) => setTotal(res.data.length));
  }, [axiosSecure, user.email]);

  const numberOfPages = Math.ceil(total / petPerPage);

  const data = useMemo(() => myAdded, []);
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = [
    { header: "Serial" },
    {
      header: "Name",
    },
    {
      header: "Category",
    },
    {
      header: "Image",
    },
    {
      header: "Status",
    },
    {
      header: "Adopt",
    },
    {
      header: "Update",
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
  const handleAdopt = (pet) => {
    axiosSecure
      .patch(`/pet/${pet._id}`, {
        adoption_status: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Successful",
            text: `${pet?.pet_name} is  Adopted`,
            icon: "success",
          });
        }
      });
  };
  const handleDelete = (pet) => {
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
        axiosSecure.delete(`/pet/${pet._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted",
              text: `${pet.pet_name} is Removed`,
            });
            refetch();
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
          Added Pets : {total}
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
            {myAdded.map((added) => (
              <>
                <TableRow key={added._id}>
                  <th>{added?._id}</th>
                  <th>{added?.pet_name}</th>
                  <th>{added?.pet_category.value}</th>
                  <th>
                    <Avatar src={added?.pet_image} />
                  </th>
                  <th>{added?.adoption_status ? "Adopted" : "Not Adopted"}</th>
                  <th>
                    {" "}
                    {added?.adoption_status ? (
                      <Button disabled>Adopted</Button>
                    ) : (
                      <Button
                        onClick={() => handleAdopt(added)}
                        color="neutral"
                      >
                        Adopt
                      </Button>
                    )}
                  </th>
                  <th>
                    <Link to={`/dashboard/update-pet/${added?._id}`}>
                      {" "}
                      <IconButton color="warning">
                        <AutoFixNormal fontSize="large" />
                      </IconButton>
                    </Link>
                  </th>
                  <th>
                    <IconButton
                      onClick={() => handleDelete(added)}
                      color="danger"
                    >
                      <DeleteForever fontSize="large" />
                    </IconButton>
                  </th>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        {total > 10 && (
          <Grid width={500} mx={"auto"} my={2}>
            <Stack>
              <Pagination
                count={numberOfPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                size="large"
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AddedPets;
