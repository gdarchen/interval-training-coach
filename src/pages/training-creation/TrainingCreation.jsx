import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import IntervalList from "../../common/intervals-list/IntervalList";
import {
  saveTrainingAction,
  saveTrainingInCreationAction,
  updateTrainingAction,
  saveSelectedTrainingAction
} from "../../redux/actions/trainingActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%"
  },
  trainingTitle: {
    marginBottom: 10,
    "& label": {
      color: theme.palette.secondary.light
    },
    "& .MuiOutlinedInput-root:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline, & .MuiInoutBase-root:hover": {
      borderColor: theme.palette.secondary.light
    },
    "& input": {
      color: theme.palette.primary.main
    }
  },
  addIntervalButton: {
    marginTop: 20
  },
  validateButton: {
    position: "absolute",
    bottom: theme.spacing(2)
  },
  intervalCreatorContainer: {
    maxHeight: "75%",
    overflow: "auto"
  }
}));

const TrainingCreation = ({
  trainingInCreation,
  saveTrainingInCreation,
  saveTraining,
  updateTraining,
  saveSelectedTraining,
  trainingToEdit = null,
  isEditionMode = false
}) => {
  const classes = useStyles();

  console.log(trainingInCreation);
  const [wasSaveClicked, setWasSaveClicked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    saveTrainingInCreation(trainingToEdit);
  }, [trainingToEdit, saveTrainingInCreation]);

  const onSaveButtonClick = () => {
    setWasSaveClicked(true);
    if (trainingInCreation) {
      // Creation mode
      if (!isEditionMode) {
        saveTraining(trainingInCreation);
      } else if (trainingToEdit) {
        // Edit mode
        updateTraining(trainingToEdit.id, trainingInCreation);
        saveSelectedTraining(trainingInCreation);
        history.push("/");
      }
    }
  };

  const onEditTrainingName = e => {
    setWasSaveClicked(false);
    saveTrainingInCreation({
      name: e.target.value,
      periods:
        trainingInCreation && trainingInCreation.periods
          ? [...trainingInCreation.periods]
          : []
    });
  };

  const onAddIntervalClick = () => {
    const newInterval = {
      id: uuidv4(),
      group: [
        {
          id: uuidv4(),
          duration: null,
          description: null
        }
      ],
      occurences: 1
    };
    saveTrainingInCreation({
      ...trainingInCreation,
      periods:
        trainingInCreation && trainingInCreation.periods
          ? [...trainingInCreation.periods, newInterval]
          : [newInterval]
    });
  };

  const isTrainingNameInError =
    wasSaveClicked && !(trainingInCreation && trainingInCreation.name);

  const hasEmptyPeriods =
    trainingInCreation &&
    trainingInCreation.periods.some(p => {
      return p.group.some(
        interval => interval.duration === null || interval.description === null
      );
    });
  console.log(hasEmptyPeriods);

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Training name"
        variant="outlined"
        className={classes.trainingTitle}
        value={(trainingInCreation && trainingInCreation.name) || ""}
        helperText={isTrainingNameInError ? "Cannot be empty." : null}
        onChange={onEditTrainingName}
        error={isTrainingNameInError}
      />

      <div className={classes.intervalCreatorContainer}>
        <IntervalList isEditMode training={trainingInCreation} />
      </div>

      <Button
        color="primary"
        className={classes.addIntervalButton}
        onClick={onAddIntervalClick}
      >
        Add an interval
      </Button>

      <Button
        variant="contained"
        color="primary"
        className={classes.validateButton}
        onClick={onSaveButtonClick}
        disabled={!trainingInCreation || hasEmptyPeriods}
      >
        {isEditionMode ? "Update" : "Save"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  trainingInCreation: state.trainingReducer.trainingInCreation
});

const mapDispatchToProps = dispatch => ({
  saveTrainingInCreation: training =>
    dispatch(saveTrainingInCreationAction(training)),
  saveTraining: training => dispatch(saveTrainingAction(training)),
  saveSelectedTraining: training =>
    dispatch(saveSelectedTrainingAction(training)),
  updateTraining: (id, training) => dispatch(updateTrainingAction(id, training))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCreation);
