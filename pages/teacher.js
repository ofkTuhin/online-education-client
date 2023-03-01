import FullLayout from "@layouts/FullLayout";
import { Button, Grid, Typography } from "@mui/material";
import TutorialForm from "components/form/TutorialForm";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useAppContext } from "store/store";
import { makeStyles } from "@material-ui/core/styles";
import MyCard from "components/cards/TutorialCard";
import { Axios } from "@lib/axios";

const Teacher = ({ session }) => {
  const [open, setOpen] = useState(false);
  const {
    tutorialState: { tutorials },
  } = useAppContext();
  const tutorialByTeacher = tutorials.filter(
    (el) => el.teacher === session?.user?.user?.email
  );
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: theme.spacing(2),
      textDecoration: "none",
    },
  }));
  const classesStyle = useStyles();
  return (
    <FullLayout>
      <Button
        variant="contained"
        color={"primary"}
        onClick={() => setOpen(true)}
      >
        Add Class
      </Button>
      <TutorialForm open={open} setOpen={setOpen} />
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
      </Grid>

      <Grid my={4} ml={2}>
        <Typography variant="h3">
          Claas by{" "}
          <span
            style={{
              color: "#5b25b2",
            }}
          >
            {session?.user?.user?.result[0]?.name}
          </span>
        </Typography>
      </Grid>
      <div className={classesStyle.root}>
        <Grid container spacing={2}>
          {tutorialByTeacher.map((tutorial, i) => (
            <Grid item xs={12} sm={6} md={3}>
              <MyCard
                title={tutorial.subject}
                topics={tutorial.topics}
                classes={tutorial.class}
                teacher={tutorial.teacher}
                id={tutorial._id}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </FullLayout>
  );
};

export default Teacher;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const teacher = Axios.get("");
  if (session) {
    if (session?.user?.user?.role !== "teacher") {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
