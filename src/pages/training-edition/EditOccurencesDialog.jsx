import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Input,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  savePeriodInOccurenceEditionAction,
  updatePeriodOccurencesAction,
} from "../../redux/actions/trainingActions";
import { formatDuration } from "../../utils/durationUtils";

const useStyles = makeStyles({
  input: {
    width: 42,
  },
  intervalItem: {
    padding: 0,
    "& span": {
      fontSize: "small",
    },
    "& p": {
      fontSize: "smaller",
    },
  },
  modalInstruction: {
    marginTop: 20,
  },
  divider: {
    margin: "0 -24px",
  },
});

const EditOccurencesDialog = ({
  periodToEdit,
  savePeriodInOccurenceEdition,
  updatePeriodOccurences,
}) => {
  const classes = useStyles();
  const [occurences, setOccurences] = useState();
  const minValue = 1;
  const maxValue = 20;
  const stepValue = 1;

  useEffect(() => {
    if (periodToEdit) {
      setOccurences(periodToEdit.occurences);
    }
  }, [periodToEdit]);

  const handleSliderChange = (event, newValue) => {
    setOccurences(newValue);
  };

  const handleInputChange = (event) => {
    setOccurences(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (occurences < minValue) {
      setOccurences(minValue);
    } else if (occurences > maxValue) {
      setOccurences(maxValue);
    }
  };

  const onCancel = () => {
    savePeriodInOccurenceEdition(null);
  };

  const onValidatePeriodOccurenceUpdate = () => {
    if (periodToEdit && occurences !== periodToEdit.occurences) {
      updatePeriodOccurences(periodToEdit.id, occurences);
    }
    savePeriodInOccurenceEdition(null);
  };

  return (
    <Dialog open={!!periodToEdit} scroll="paper">
      <DialogTitle>Edit occurences number</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2">Selected period</Typography>
        <List className={classes.root}>
          {periodToEdit &&
            periodToEdit.group &&
            periodToEdit.group.length &&
            periodToEdit.group.map((interval, index) => (
              <ListItem
                key={`interval-${interval.id}`}
                className={classes.intervalItem}
              >
                <ListItemText
                  primary={interval.description}
                  secondary={formatDuration(interval.duration)}
                />
              </ListItem>
            ))}
        </List>

        <Divider className={classes.divider} />

        <DialogContentText className={classes.modalInstruction}>
          Edit the occurence number of the selected period.
        </DialogContentText>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={typeof occurences === "number" ? occurences : minValue}
              onChange={handleSliderChange}
              min={minValue}
              max={maxValue}
              step={stepValue}
              color="secondary"
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.input}
              value={occurences}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              color="secondary"
              inputProps={{
                step: stepValue,
                min: minValue,
                max: maxValue,
                type: "number",
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onValidatePeriodOccurenceUpdate} color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  savePeriodInOccurenceEdition: (period) =>
    dispatch(savePeriodInOccurenceEditionAction(period)),
  updatePeriodOccurences: (periodId, occurences) =>
    dispatch(updatePeriodOccurencesAction(periodId, occurences)),
});

export default connect(null, mapDispatchToProps)(EditOccurencesDialog);
