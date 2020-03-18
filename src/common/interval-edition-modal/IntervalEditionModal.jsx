import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import jp from "jsonpath";
import isEqual from "lodash/isEqual";
import React, { useState, useEffect } from "react";
import DurationPicker from "react-duration-picker";
import { connect } from "react-redux";
import { saveTrainingInCreationAction } from "../../redux/actions/trainingActions";

window.jp = jp;

const useStyles = makeStyles(theme => ({
  modalContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& hr.rdp-reticule": {
      borderColor: theme.palette.secondary.light
    }
  },
  durationTitle: {
    marginTop: 30,
    marginBottom: 0
  },
  durationError: {
    margin: 0,
    fontSize: "0.75rem",
    marginTop: 3,
    textAlign: "left",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    marginLeft: 14,
    marginRight: 14,
    color: "#f44336"
  }
}));

const IntervalEditionModal = ({
  isModalOpened,
  handleCloseModal,
  intervalToEdit,
  trainingInCreation,
  saveTrainingInCreation
}) => {
  const classes = useStyles();
  const [description, setDescription] = useState(
    (intervalToEdit && intervalToEdit.description) || ""
  );
  const [duration, setDuration] = useState();
  const [isDescriptionInError, setIsDescriptionInError] = useState(false);
  const [isDurationInError, setIsDurationInError] = useState(false);

  useEffect(() => {
    if (intervalToEdit && intervalToEdit.description) {
      setDescription(intervalToEdit.description);
    }

    if (intervalToEdit && intervalToEdit.duration) {
      setDuration(intervalToEdit.duration);
    }
  }, [intervalToEdit]);

  const onDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const onDurationChange = d => {
    setDuration(d);
  };

  const onValidateInterval = () => {
    setIsDescriptionInError(false);
    setIsDurationInError(false);
    let wasErrorSet = false;

    if (!description || description.length > 100) {
      wasErrorSet = true;
      setIsDescriptionInError(true);
    }

    if (!duration || isEqual(duration, { hours: 0, minutes: 0, seconds: 0 })) {
      wasErrorSet = true;
      setIsDurationInError(true);
    }

    if (!wasErrorSet) {
      // Updates the trainingInCreation object
      jp.apply(
        trainingInCreation,
        `$..group[?(@.id == '${intervalToEdit.id}')]`,
        value => ({
          id: intervalToEdit.id,
          description,
          duration
        })
      );
      saveTrainingInCreation({ ...trainingInCreation });
      setDuration(null);
      setDescription("");
      handleCloseModal();
    }
  };

  const onCancel = () => {
    setDescription("");
    setDuration(null);
    handleCloseModal();
  };

  return (
    <Dialog open={isModalOpened} onClose={handleCloseModal}>
      <DialogTitle>Interval edition</DialogTitle>
      <DialogContent>
        <div className={classes.modalContent}>
          <DialogContentText className={classes.descriptionTitle}>
            Interval description
          </DialogContentText>
          <TextField
            variant="filled"
            label="Description"
            color="secondary"
            value={description}
            onChange={onDescriptionChange}
            error={isDescriptionInError}
            helperText={
              isDescriptionInError
                ? "Cannot be empty and must be less than 100 characters."
                : null
            }
          />

          <DialogContentText className={classes.durationTitle}>
            Interval duration
          </DialogContentText>
          {isDurationInError && (
            <p className={classes.durationError}>Cannot be empty.</p>
          )}
          <DurationPicker
            onChange={onDurationChange}
            initialDuration={
              intervalToEdit && intervalToEdit.duration
                ? intervalToEdit.duration
                : { hours: 0, minutes: 0, seconds: 0 }
            }
            maxHours={4}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onValidateInterval} color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  intervalToEdit: state.trainingReducer.intervalToEdit,
  trainingInCreation: state.trainingReducer.trainingInCreation
});

const mapDispatchToProps = dispatch => ({
  saveTrainingInCreation: training =>
    dispatch(saveTrainingInCreationAction(training))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervalEditionModal);
