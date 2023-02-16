import FullLayout from "@layouts/FullLayout";
import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import AdminCard from "components/cards/AdminCard";
import AdminForm from "components/form/AdminForm";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Toast from "components/Toast";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAppContext } from "store/store";

const admin = ({ session }) => {
  const { role: roles, email: admin_email } = session.user || {};
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([{}]);
  // get userState value from context
  const {
    userState: { loading, users, error },
  } = useAppContext();
  const [open, setOpen] = useState(false);
  // handling role for the admin
  const handleRole = (value, userId) => {
    setUpdateButton(true);
    const data = {
      id: userId,
      role: value,
    };
    if (role.map((data) => data?.id).includes(userId)) {
      setRole(role.filter((x) => x.id !== userId));
    } else {
      setRole((prevValue) => [...prevValue, data]);
    }
  };

  let content;
  if (loading) {
    content = (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8}>
            <LinearProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (error) {
    content = (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
            <FeatherIcon
              icon="alert-octagon"
              style={{ color: "#ddd", height: "50px", width: "50px" }}
            />
            <Typography>Something Went Wrong!</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (!loading && !error && users.length === 0) {
    content = (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} sx={{ textAlign: "center", py: 4 }}>
            <FeatherIcon icon="inbox" />
            <Typography>No Data Found!</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (!loading && !error && users.length) {
    content = users.map((user, i) => (
      <AdminCard
        user={user}
        key={i}
        index={i}
        admin={admin}
        handleRole={handleRole}
        roles={roles}
        admin_email={admin_email}
      />
    ));
  }

  useEffect(() => {
    setUser(content);
  }, [users]);
  const handleOpen = () => setOpen(true);
  return (
    <FullLayout>
      <AdminForm session={session} role={roles} open={open} setOpen={setOpen} />
      <Toast />
      <Grid
        sx={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "15px",
        }}
      >
        {/* {updateButton && isAdmin && (
          <SubmitButton
            onClick={handleSubmit}
            loader={loader}
            submitted={submitted}
            initial="update"
            submitting="updating"
            close="updated"
            sx={{ marginRight: "10px" }}
          />
        )} */}
        {roles === "admin" && (
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add user
          </Button>
        )}
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Handle</TableCell> */}
              <TableCell>Sr</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              {roles === "admin" && <TableCell>Delete</TableCell>}
            </TableRow>
          </TableHead>
          {user}
        </Table>
      </TableContainer>
    </FullLayout>
  );
};

export default admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
