import { Grid, Typography } from "@mui/material";
import React from "react";

const StudentCard = ({ item }) => {
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
      <Typography>Class: {item?.class}</Typography>
      <Typography>Group: {item?.group}</Typography>
    </Grid>
  );
};

export default StudentCard;
