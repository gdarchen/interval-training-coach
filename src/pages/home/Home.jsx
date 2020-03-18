import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import IntervalList from "../../common/intervals-list/IntervalList";
import TrainingSelector from "../../common/training-selector/TrainingSelector";
import { saveSelectedTrainingAction } from "../../redux/actions/trainingActions";
import { speak } from "../../utils/textToSpeechUtils";

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  }
}));

const Home = ({
  selectedTraining,
  saveSelectedTrainingAction: saveSelectedTraining
}) => {
  const classes = useStyles();
  const history = useHistory();

  const actions = [
    {
      icon: <AddCircleIcon />,
      name: "Create a training",
      onClick: () => history.push("/training-creation")
    },
    ...(selectedTraining
      ? [{ icon: <EditIcon />, name: "Edit this training" }]
      : [])
  ];

  const [isDialOpened, setIsDialOpened] = useState(false);

  const onTrainingSelection = (event, value) => {
    saveSelectedTraining(value);
  };

  const onDialOpen = () => {
    setIsDialOpened(true);
  };

  const onDialClose = () => {
    setIsDialOpened(false);
  };

  return (
    <>
      <button onClick={speak}>Speech-to-text</button>

      <TrainingSelector onTrainingSelection={onTrainingSelection} />

      <IntervalList training={selectedTraining} />

      <SpeedDial
        ariaLabel="speed-dial-main-actions"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={onDialClose}
        onOpen={onDialOpen}
        open={isDialOpened}
        direction="up"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </>
  );
};

const mapStateToProps = state => ({
  selectedTraining: state.trainingReducer.selectedTraining
});

const mapDispatchToProps = dispatch => ({
  saveSelectedTrainingAction: training =>
    dispatch(saveSelectedTrainingAction(training))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
