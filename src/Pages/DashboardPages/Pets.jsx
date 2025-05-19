import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Button, IconButton } from "@mui/joy";
import { AutoFixNormal, DeleteForever } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: pets = [], refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure(`/pets`);
      return res.data;
    },
  });

  const data = useMemo(() => pets, []);

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
      .patch(`/pet/${pet?._id}`, {
        adoption_status: true,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${pet?.pet_name} is Adopted`);
        }
      });
  };
  const handleUndoAdopt = (pet) => {
    axiosSecure
      .patch(`/pet/${pet._id}`, {
        adoption_status: false,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${pet.pet_name} is Returned`);
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
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted",
              text: `${pet?.pet_name} is Removed`,
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
          Total : {pets.length}
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
            {pets.map((pet) => (
              <TableRow key={pet._id}>
                <th>{pet?._id}</th>
                <th>{pet?.pet_name}</th>
                <th>{pet?.pet_category.value}</th>
                <th>
                  <Avatar src={pet?.pet_image} />
                </th>
                <th>{pet?.adoption_status ? "Adopted" : "Not Adopted"}</th>
                <th>
                  {" "}
                  {pet.adoption_status ? (
                    <Button color="danger" onClick={() => handleUndoAdopt(pet)}>
                      Undo Adopt
                    </Button>
                  ) : (
                    <Button onClick={() => handleAdopt(pet)} color="success">
                      Adopt
                    </Button>
                  )}
                </th>
                <th>
                  <Link to={`/dashboard/update-pet/${pet?._id}`}>
                    {" "}
                    <IconButton color="warning">
                      <AutoFixNormal fontSize="large" />
                    </IconButton>
                  </Link>
                </th>
                <th>
                  <IconButton onClick={() => handleDelete(pet)} color="danger">
                    <DeleteForever fontSize="large" />
                  </IconButton>
                </th>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default AllPets;
