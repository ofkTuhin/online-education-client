import React from "react";
import { Axios } from "@lib/axios";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Label from "components/FormLabel";
import { useState } from "react";
import { useAppContext } from "store/store";
import { useRouter } from "next/router";

const StudentRegistation = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    class: "",
    group: "",
  });
  const router = useRouter();

  const { userDispatch, existMessage, setExistMessage } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "student/",

        {
          name: student.name,
          email: student.email,
          password: student.password + "student",
          phone: student.phone,
          class: student.class,
          group: student.group,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        router.push("/auth/signIn/?user=student");
        setStudent({
          ...student,
          email: "",
          password: "",
          class: "",
          phone: "",
          name: "",
          group: "",
        });

        userDispatch({
          type: "ADD_USER",
          payload: student,
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
        <Typography variant="h1" mt={10} mb={4}>
          Student Registation{" "}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item>
            <Label htmlFor="name" required={true} label="name" />
            <TextField
              id="name"
              placeholder="name"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="text"
            />
          </Grid>
          <Grid item>
            <Label htmlFor="email" required={true} label="Email" />
            <TextField
              id="email"
              placeholder="Email"
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
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
              value={student.password}
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="password"
            />
          </Grid>

          <Grid item>
            <Label htmlFor="phone" required={true} label="phone" />
            <TextField
              id="phone"
              placeholder="phone"
              value={student.phone}
              onChange={(e) =>
                setStudent({ ...student, phone: e.target.value })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="text"
            />
          </Grid>
          <Grid item>
            <Label htmlFor="class" required={true} label="Select class" />
            <Select
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) =>
                setStudent({ ...student, class: e.target.value })
              }
              value={student.class}
              displayEmpty
              fullWidth
              placeholder="Select class"
            >
              <MenuItem value="" disabled>
                <em>Select a class</em>
              </MenuItem>
              <MenuItem value="nine">Nine</MenuItem>
              <MenuItem value="ten">Ten</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Label htmlFor="group" required={true} label="Select group" />
            <Select
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) =>
                setStudent({ ...student, group: e.target.value })
              }
              value={student.group}
              displayEmpty
              fullWidth
              placeholder="Select group"
            >
              <MenuItem value="" disabled>
                <em>Select a group</em>
              </MenuItem>
              <MenuItem value="sceince">Science</MenuItem>
              <MenuItem value="commerce">Commerce</MenuItem>
            </Select>
          </Grid>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default StudentRegistation;
