import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Tooltip } from "@material-ui/core";
import { deleteIntervalAction } from "../../redux/actions/trainingActions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 400
  },
  deleteIntervalButton: {
    marginLeft: "auto"
  }
});

const IntervalListItem = ({
  intervalId,
  formattedDuration,
  description,
  isEditMode,
  deleteInterval
}) => {
  const classes = useStyles();

  const onDeleteClick = e => {
    e.stopPropagation();
    deleteInterval(intervalId);
  };

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

      {isEditMode && (
        <CardActions disableSpacing>
          <Tooltip title="Edit interval" arrow>
            <IconButton
              aria-label="edit interval"
              color="secondary"
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete interval" arrow>
            <IconButton
              aria-label="delete interval"
              color="secondary"
              size="small"
              className={classes.deleteIntervalButton}
              onClick={e => onDeleteClick(e)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteInterval: intervalId => dispatch(deleteIntervalAction(intervalId))
});

export default connect(null, mapDispatchToProps)(IntervalListItem);
