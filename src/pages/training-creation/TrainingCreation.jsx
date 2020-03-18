import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import IntervalList from "../../common/intervals-list/IntervalList";
import { v4 as uuidv4 } from "uuid";
import { saveTrainingInCreationAction } from "../../redux/actions/trainingActions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  trainingTitle: {
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
  }
}));

const TrainingCreation = ({ trainingInCreation, saveTrainingInCreation }) => {
  const classes = useStyles();

  console.log("tic", trainingInCreation);

  const [wasSaveClicked, setWasSaveClicked] = useState(false);

  const onSaveButtonClick = () => {
    setWasSaveClicked(true);
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

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Training name"
        variant="outlined"
        className={classes.trainingTitle}
        helperText={isTrainingNameInError ? "Cannot be empty." : null}
        onChange={onEditTrainingName}
        error={isTrainingNameInError}
      />

      <IntervalList isEditMode training={trainingInCreation} />

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
      >
        Save
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  trainingInCreation: state.trainingReducer.trainingInCreation
});

const mapDispatchToProps = dispatch => ({
  saveTrainingInCreation: training =>
    dispatch(saveTrainingInCreationAction(training))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCreation);
