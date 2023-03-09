import FullLayout from "@layouts/FullLayout";
import { Grid, Typography } from "@mui/material";
import StudentCard from "components/cards/StudentCard";
import { getSession } from "next-auth/react";
import React from "react";
import { useAppContext } from "store/store";

const AllStudents = () => {
  const {
    studentState: { students },
  } = useAppContext();

  return (
    <FullLayout>
      <Grid>
        <Grid>
          <Typography variant="h1" ml={2}>
            All Student
          </Typography>
        </Grid>
        <Grid>
          {students.map((item, i) => (
            <StudentCard key={i} item={item} />
          ))}
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export default AllStudents;
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
  if (session.user.user.role !== "admin") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
