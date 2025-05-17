import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button } from "@mui/joy";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Successful",
              text: `${user?.name} is now an Admin`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <Grid>
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
          TOTAL USERS : {users.length}
        </Typography>
      </Paper>

      {/* users table */}
      <Grid my={6} overflow={"auto"}>
        <Table>
          {/* head */}
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* rows*/}
            {users.map((user, index) => (
              <TableRow sx={{ textAlign: "center" }} key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">
                  <Avatar src={user?.image} alt="profile" />
                </TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <Button  disabled>Admin</Button>
                  ) : (
                    <Button onClick={() => handleAdmin(user)}>
                      Make Admin
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Users;
