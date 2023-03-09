import { Grid, Typography } from "@mui/material";
import React from "react";

const TeacherCard = ({ item }) => {
  return (
    <Grid
      ml={2}
      sx={{
        border: "1px solid #666",
        padding: "10px 20px",
        marginTop: "30px",
      }}
    >
      <Typography>Nmae: {item?.name}</Typography>
      <Typography>Email: {item?.email}</Typography>
      <Typography>Phone: {item?.phone}</Typography>
    </Grid>
  );
};

export default TeacherCard;
