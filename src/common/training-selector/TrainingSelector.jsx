import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => {
  console.log(theme);
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

const TrainingSelector = ({ trainings, onTrainingSelection }) => {
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
        onChange={onTrainingSelection}
        style={{ width: 300 }}
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
