import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import IntervalList from "../../common/intervals-list/IntervalList";
import {
  saveSelectedTrainingAction,
  saveTrainingAction,
  saveTrainingInCreationAction,
  updateTrainingAction,
  savePeriodInOccurenceEditionAction,
  deletePeriodAction,
} from "../../redux/actions/trainingActions";
import EditOccurencesDialog from "../training-edition/EditOccurencesDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
  },
  trainingTitle: {
    marginBottom: 10,
    "& label": {
      color: theme.palette.secondary.light,
    },
    "& .MuiOutlinedInput-root:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline, & .MuiInoutBase-root:hover": {
      borderColor: theme.palette.secondary.light,
    },
    "& input": {
      color: theme.palette.primary.main,
    },
  },
  repeatIntervalsButtonGroup: {
    marginTop: 20,
    marginLeft: 60,
  },
  repeatIntervalsButton: {
    marginTop: 20,
  },
  repeatSelectedPeriodsButton: {
    marginTop: 20,
  },
  validateButton: {
    position: "absolute",
    bottom: theme.spacing(2),
  },
  intervalCreatorContainer: {
    maxHeight: "75%",
    width: "95%",
    overflow: "auto",
  },
  mainActionsContainer: {
    marginBottom: 70,
  },
}));

const TrainingCreation = ({
  trainingInCreation,
  saveTrainingInCreation,
  saveTraining,
  updateTraining,
  saveSelectedTraining,
  trainingToEdit = null,
  isEditionMode = false,
  periodInOccurenceEdition,
  savePeriodInOccurenceEdition,
  deletePeriod,
}) => {
  const classes = useStyles();

  const [wasSaveClicked, setWasSaveClicked] = useState(false);
  const [isRepeatEditionActive, setIsRepeatEditionActive] = useState(false);
  const [selectedPeriodsToRepeat, setSelectedPeriodsToRepeat] = useState([]);
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

  const onEditTrainingName = (e) => {
    setWasSaveClicked(false);
    saveTrainingInCreation({
      name: e.target.value,
      periods:
        trainingInCreation && trainingInCreation.periods
          ? [...trainingInCreation.periods]
          : [],
    });
  };

  const onAddIntervalClick = () => {
    const newInterval = {
      id: uuidv4(),
      group: [
        {
          id: uuidv4(),
          duration: null,
          description: null,
        },
      ],
      occurences: 1,
    };
    saveTrainingInCreation({
      ...trainingInCreation,
      periods:
        trainingInCreation && trainingInCreation.periods
          ? [...trainingInCreation.periods, newInterval]
          : [newInterval],
    });
  };

  const isTrainingNameInError =
    wasSaveClicked && !(trainingInCreation && trainingInCreation.name);

  const hasEmptyPeriods =
    trainingInCreation &&
    trainingInCreation.periods &&
    trainingInCreation.periods.some((p) => {
      return p.group.some(
        (interval) =>
          interval.duration === null || interval.description === null
      );
    });

  const onRepeatIntervalClick = () => {
    setIsRepeatEditionActive((prev) => !prev);
  };

  const onCheckPeriodToRepeat = (period) => {
    setSelectedPeriodsToRepeat((prev) => {
      // If the period was already selected, we remove it
      if (prev.some((per) => per.id === period.id)) {
        return prev.filter((per) => per.id !== period.id);
      }
      // Else we add it to the selected periods
      return [...prev, period];
    });
  };

  const onRepeatSelectedPeriodClick = () => {
    // We merge everything in the first selected period and remove the other (since they will be duplicated)
    const [periodToRepeat, ...periodsToRemove] = selectedPeriodsToRepeat;
    const group = [];
    selectedPeriodsToRepeat.map((per) => {
      return group.push(...per.group);
    });
    periodToRepeat.group = group;
    savePeriodInOccurenceEdition(periodToRepeat);
    // Remove the other periods since they are now grouped with the 'periodToRepeat'
    periodsToRemove.forEach((per) => {
      deletePeriod(per.id);
    });
  };

  return (
    <>
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
          <IntervalList
            isEditMode
            isRepeatEditionMode={isRepeatEditionActive}
            training={trainingInCreation}
            onCheckPeriodToRepeat={onCheckPeriodToRepeat}
            selectedPeriodsToRepeat={selectedPeriodsToRepeat}
          />
        </div>

        <div className={classes.mainActionsContainer}>
          <Button color="primary" onClick={onAddIntervalClick}>
            Add an interval
          </Button>

          <ButtonGroup
            orientation="vertical"
            className={classes.repeatIntervalsButtonGroup}
          >
            <Button
              color="primary"
              className={classes.repeatIntervalsButton}
              onClick={onRepeatIntervalClick}
            >
              {isRepeatEditionActive ? "Save repeats" : "Repeat intervals"}
            </Button>

            {isRepeatEditionActive && (
              <Button
                color="secondary"
                className={classes.repeatSelectedPeriodsButton}
                onClick={onRepeatSelectedPeriodClick}
                disabled={
                  !(selectedPeriodsToRepeat && selectedPeriodsToRepeat.length)
                }
              >
                Repeat selected periods
              </Button>
            )}
          </ButtonGroup>
        </div>

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

      <EditOccurencesDialog periodToEdit={periodInOccurenceEdition} />
    </>
  );
};

const mapStateToProps = (state) => ({
  trainingInCreation: state.trainingReducer.trainingInCreation,
  periodInOccurenceEdition: state.trainingReducer.periodInOccurenceEdition,
});

const mapDispatchToProps = (dispatch) => ({
  saveTrainingInCreation: (training) =>
    dispatch(saveTrainingInCreationAction(training)),
  saveTraining: (training) => dispatch(saveTrainingAction(training)),
  saveSelectedTraining: (training) =>
    dispatch(saveSelectedTrainingAction(training)),
  updateTraining: (id, training) =>
    dispatch(updateTrainingAction(id, training)),
  savePeriodInOccurenceEdition: (period) =>
    dispatch(savePeriodInOccurenceEditionAction(period)),
  deletePeriod: (periodId) => dispatch(deletePeriodAction(periodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCreation);
