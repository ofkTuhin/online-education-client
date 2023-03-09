import FullLayout from "@layouts/FullLayout";
import { Grid, Typography } from "@mui/material";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppContext } from "store/store";

const Student = ({ session }) => {
  return (
    <FullLayout>
      <Typography variant="h2" ml={2} my={2}>
        Student Info
      </Typography>
      <Grid
        ml={2}
        sx={{
          border: "1px solid #666",
          padding: "10px 20px",
          marginTop: "30px",
        }}
      >
        <Typography>Nmae: {session?.user?.user?.result[0]?.name}</Typography>
        <Typography>Email: {session?.user?.user?.result[0]?.email}</Typography>
        <Typography>Phone: {session?.user?.user?.result[0]?.phone}</Typography>
        <Typography>Class: {session?.user?.user?.result[0]?.class}</Typography>
        <Typography>Group: {session?.user?.user?.result[0]?.group}</Typography>
      </Grid>
    </FullLayout>
  );
};
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
  if (session) {
    if (session.user.user.role !== "student") {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
  return {
    props: { session },
  };
}
export default Student;
