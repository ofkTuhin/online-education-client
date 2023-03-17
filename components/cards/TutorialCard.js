import Link from "next/link";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { Axios } from "@lib/axios";

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
  const deleteClass = (classId) => {
    console.log("class");
    const res = Axios.delete(`class/delete-class/${classId}`);
    if (res.status === 200) {
      console.log("delete successfully");
    }
  };

  return (
    <Card className={classesStyle.card}>
      <CardContent>
        <Link href={`/${id}`}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Link>
        <Grid className={classesStyle.cardcontent}>
          <Typography color="textSecondary">{classes}</Typography>
          <Typography color="textSecondary">{topics}</Typography>
        </Grid>
        <Typography>by: {teacher}</Typography>
        <Button onClick={() => deleteClass(id)}>Delete</Button>
      </CardContent>
    </Card>
  );
};
export default MyCard;
