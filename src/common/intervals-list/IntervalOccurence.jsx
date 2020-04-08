import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 100
  },
  content: {
    padding: "unset !important",
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  occurences: {
    marginLeft: 10,
    color: "red"
  }
});

const IntervalOccurences = ({ occurences }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="subtitle1" component="p">
          Repeat
          <span className={classes.occurences}>&#10005; {occurences}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IntervalOccurences;
