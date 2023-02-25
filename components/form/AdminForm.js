import { Axios } from "@lib/axios";
import { modalStyle } from "@lib/customStyles";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Label from "components/FormLabel";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppContext } from "store/store";

const AdminForm = ({ open, setOpen, setIsSubmit }) => {
  const [admin, setAdmin] = useState({ email: "", password: "", name: "" });
  const router = useRouter();
  const { userDispatch, existMessage, setExistMessage } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "admin",

        {
          email: admin.email,
          password: admin.password,
          name: admin.name,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        router.push("/auth/signIn/?user=admin");
        setAdmin({ ...admin, email: "", password: "", name: "" });

        userDispatch({
          type: "ADD_USER",
          payload: admin,
        });
      }
    } catch (error) {
      if (error) {
        if (error.response.status === 409) {
          setExistMessage(error.response.data.message);
        }
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(400)}>
          <Grid container spacing={4}>
            <Grid
              item
              sx={{
                margin: "auto",
                backgroundColor: "white",
                paddingRight: "32px",
                paddingBottom: "32px",
              }}
            >
              <Typography variant="h1" mt={10} mb={4}>
                Admin Registation{" "}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid item>
                  <Label htmlFor="name" required={true} label="name" />
                  <TextField
                    id="name"
                    placeholder="name"
                    value={admin.name}
                    onChange={(e) =>
                      setAdmin({ ...admin, name: e.target.value })
                    }
                    sx={{
                      marginBottom: "10px",
                    }}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item>
                  <Label htmlFor="email" required={true} label="Email" />
                  <TextField
                    id="email"
                    placeholder="Email"
                    value={admin.email}
                    onChange={(e) =>
                      setAdmin({ ...admin, email: e.target.value })
                    }
                    sx={{
                      marginBottom: "10px",
                    }}
                    fullWidth
                    required
                  />
                  {existMessage && (
                    <Typography color="red">
                      {existMessage}
                      <br /> You can login by this email
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Label htmlFor="password" required={true} label="Password" />
                  <TextField
                    id="password"
                    placeholder="password"
                    value={admin.password}
                    onChange={(e) =>
                      setAdmin({ ...admin, password: e.target.value })
                    }
                    sx={{
                      marginBottom: "10px",
                    }}
                    fullWidth
                    required
                    type="password"
                  />
                </Grid>

                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminForm;
