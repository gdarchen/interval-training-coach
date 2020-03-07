import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 400
  }
});

const IntervalListItem = ({ formattedDuration, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {description}
        </Typography>
        <Typography variant="body2" component="p">
          {formattedDuration}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IntervalListItem;
