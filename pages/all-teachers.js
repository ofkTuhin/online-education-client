import FullLayout from "@layouts/FullLayout";
import { Grid, Typography } from "@mui/material";
import TeacherCard from "components/cards/TeacherCard";
import { getSession } from "next-auth/react";
import React from "react";
import { useAppContext } from "store/store";

const AllTeachers = () => {
  const {
    teacherState: { teachers },
  } = useAppContext();

  return (
    <FullLayout>
      <Grid>
        <Grid>
          <Typography variant="h1" ml={2}>
            All Teacher
          </Typography>
        </Grid>
        <Grid>
          {teachers.map((item, i) => (
            <TeacherCard key={i} item={item} />
          ))}
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export default AllTeachers;
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
