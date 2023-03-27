import FullLayout from "@layouts/FullLayout";
import { Axios } from "@lib/axios";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Documents = ({ files }) => {
  console.log(files);
  return (
    <FullLayout>
      <Grid>
        <Typography mb={2} variant="h1">
          Hand Notes
        </Typography>
        {files.map((item) => (
          <Link
            sx={{
              textDecoration: "none",
            }}
            href={`https://drive.google.com/file/d/${item.file}`}
          >
            <Grid
              sx={{
                border: "1px solid black",
                borderRadius: "5px",
                textDecoration: "none",
                display: "inline-block",
              }}
              px={2}
              mr={2}
              mb={3}
            >
              <Typography>{item.name}</Typography>
            </Grid>
          </Link>
        ))}
      </Grid>
    </FullLayout>
  );
};

export default Documents;

export const getServerSideProps = async () => {
  const res = await Axios.get("class/file/pdf");

  return {
    props: {
      files: res.data.files,
    },
  };
};
