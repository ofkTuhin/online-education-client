import React from "react";
import { Axios } from "@lib/axios";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import Label from "components/FormLabel";
import { useState } from "react";
import { useAppContext } from "store/store";
import { useRouter } from "next/router";

const TeacherRegistation = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    password: "",
    subject: "",
    phone: "",
  });
  const router = useRouter();
  console.log(teacher);
  const { userDispatch, user } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "teacher/",

        {
          name: teacher.name,
          email: teacher.email,
          password: teacher.password + user,
          phone: teacher.phone,
          subject: teacher.subject,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      if (res.status === 200) {
        router.push("/auth/signIn/?user=teacher");
        setTeacher({
          ...teacher,
          email: "",
          password: "",
          subject: "",
          phone: "",
          name: "",
        });

        userDispatch({
          type: "ADD_USER",
          payload: teacher,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(teacher);
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
              value={teacher.name}
              onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="email" required={true} label="Email" />
            <TextField
              id="email"
              placeholder="Email"
              value={teacher.email}
              onChange={(e) =>
                setTeacher({ ...teacher, email: e.target.value })
              }
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
              value={teacher.password}
              onChange={(e) =>
                setTeacher({ ...teacher, password: e.target.value })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="password"
            />
          </Grid>

          <Grid item xs={6}>
            <Label htmlFor="phone" required={true} label="phone" />
            <TextField
              id="phone"
              placeholder="phone"
              value={teacher.phone}
              onChange={(e) =>
                setTeacher({ ...teacher, phone: e.target.value })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="subject" required={true} label="Select subject" />
            <Select
              sx={{
                marginBottom: "10px",
              }}
              onChange={(e) =>
                setTeacher({ ...teacher, subject: e.target.value })
              }
              value={teacher.subject}
              displayEmpty
              fullWidth
              placeholder="Select subject"
            >
              <MenuItem value="" disabled>
                <em>Select a subject</em>
              </MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Math">Math</MenuItem>
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

export default TeacherRegistation;
