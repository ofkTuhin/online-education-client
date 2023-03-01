import Link from "next/link";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
export default MyCard;
