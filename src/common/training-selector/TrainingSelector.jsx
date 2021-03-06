import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    autocomplete: {
      // width: 'unset !important',
      // maxWidth: '300px',
      "& .MuiAutocomplete-clearIndicator > span.MuiIconButton-label": {
        color: theme.palette.primary.main
      },
      "& label, & .MuiAutocomplete-popupIndicator": {
        color: theme.palette.secondary.light
      },
      "& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline, & .MuiInoutBase-root:hover": {
        borderColor: theme.palette.secondary.light
      },
      "& .MuiAutocomplete-popupIndicatorOpen, & input": {
        color: theme.palette.primary.main
      }
    }
  };
});

const TrainingSelector = ({
  trainings,
  onTrainingSelection,
  selectedTraining
}) => {
  const classes = useStyles();

  if (!trainings || !trainings.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        options={trainings}
        className={classes.autocomplete}
        getOptionLabel={option => option.name}
        getOptionSelected={option => option.name === selectedTraining.name}
        onChange={onTrainingSelection}
        style={{ width: 300 }}
        value={selectedTraining || null}
        renderInput={params => (
          <TextField {...params} label="Select a training" variant="outlined" />
        )}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  trainings: state.trainingReducer.trainings
});

export default connect(mapStateToProps)(TrainingSelector);
