import { Axios } from "@lib/axios";

import { Button, Grid, TextField } from "@mui/material";
import Label from "components/FormLabel";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppContext } from "store/store";

const AdminRegistation = () => {
  const [admin, setAdmin] = useState({ email: "", password: "", name: "" });
  const router = useRouter();
  const { userDispatch, user } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "admin/",

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
      console.log(error);
    }
  };
  console.log(admin);

  return (
    <Grid container spacing={4}>
      <Grid
        item
        sm={6}
        sx={{
          margin: "auto",
          backgroundColor: "white",
          paddingRight: "32px",
          paddingBottom: "32px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid item xs={6}>
            <Label htmlFor="name" required={true} label="name" />
            <TextField
              id="name"
              placeholder="name"
              value={admin.name}
              onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Label htmlFor="email" required={true} label="Email" />
            <TextField
              id="email"
              placeholder="Email"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="password" required={true} label="Password" />
            <TextField
              id="password"
              placeholder="password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="password"
            />
          </Grid>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AdminRegistation;
