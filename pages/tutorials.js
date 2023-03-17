import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "store/store";
import MyCard from "components/cards/TutorialCard";
import { Axios } from "@lib/axios";

const Tutorials = () => {
  const deleteClass = (classId) => {
    console.log("class");
    const res = Axios.delete(`class/delete-class/${classId}`);
    if (res.status === 200) {
      console.log("delete successfully");
    }
  };
  const {
    tutorialState: { tutorials },
  } = useAppContext();
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
      <div className={classesStyle.root}>
        <Grid container spacing={2}>
          {tutorials.map((tutorial, i) => (
            <Grid item xs={12} sm={6} md={3}>
              <MyCard
                title={tutorial.subject}
                topics={tutorial.topics}
                classes={tutorial.class}
                teacher={tutorial.teacher}
                id={tutorial._id}
                deleteClass={deleteClass}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </FullLayout>
  );
};

export default Tutorials;
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

  return {
    props: { session },
  };
}
