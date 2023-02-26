import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "store/store";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    textDecoration: "none",
  },
  card: {
    height: "100%",
  },
  cardcontent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const MyCard = ({ title, topics, classes, teacher, id }) => {
  const classesStyle = useStyles();

  return (
    <Card className={classesStyle.card}>
      <Link href={`/${id}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Grid className={classesStyle.cardcontent}>
            <Typography color="textSecondary">{classes}</Typography>
            <Typography color="textSecondary">{topics}</Typography>
          </Grid>
          <Typography>by: {teacher}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

const Tutorials = () => {
  const {
    tutorialState: { tutorials },
  } = useAppContext();

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
