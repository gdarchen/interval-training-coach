import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import DurationPicker from "react-duration-picker";

const useStyles = makeStyles(() => ({
  modalContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const DurationPickerModal = ({ isModalOpened, handleCloseModal }) => {
  const classes = useStyles();
  const [duration, setDuration] = useState();

  const onChange = d => {
    setDuration(d);
  };

  console.log(duration);

  return (
    <Dialog open={isModalOpened} onClose={handleCloseModal}>
      <DialogTitle>Interval duration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select an interval duration
        </DialogContentText>
        <div className={classes.modalContent}>
          <DurationPicker
            onChange={onChange}
            initialDuration={{ hours: 0, minutes: 0, seconds: 0 }}
            maxHours={4}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCloseModal} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DurationPickerModal;
