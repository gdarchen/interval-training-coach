import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import IntervalList from "../../common/intervals-list/IntervalList";
import TrainingSelector from "../../common/training-selector/TrainingSelector";
import {
  deleteTrainingAction,
  saveSelectedTrainingAction,
} from "../../redux/actions/trainingActions";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const Home = ({
  selectedTraining,
  trainings,
  saveSelectedTraining,
  deleteTraining,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const actions = [
    {
      icon: <AddCircleIcon />,
      name: "Create a training",
      onClick: () => history.push("/training-creation"),
    },
    ...(selectedTraining
      ? [
          {
            icon: <EditIcon />,
            name: "Edit this training",
            onClick: () =>
              history.push({
                pathname: "/training-edition",
                state: {
                  trainingToEdit: selectedTraining,
                },
              }),
          },
        ]
      : []),
    ...(selectedTraining && trainings && trainings.length > 1
      ? [
          {
            icon: <DeleteIcon />,
            name: "Delete this training",
            onClick: () => {
              deleteTraining(selectedTraining.id);
              saveSelectedTraining(null);
            },
          },
        ]
      : []),
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
      <TrainingSelector
        onTrainingSelection={onTrainingSelection}
        selectedTraining={selectedTraining}
      />

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
        {actions.map((action) => (
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

const mapStateToProps = (state) => ({
  selectedTraining: state.trainingReducer.selectedTraining,
  trainings: state.trainingReducer.trainings,
});

const mapDispatchToProps = (dispatch) => ({
  saveSelectedTraining: (training) =>
    dispatch(saveSelectedTrainingAction(training)),
  deleteTraining: (trainingId) => dispatch(deleteTrainingAction(trainingId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
