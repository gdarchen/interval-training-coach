function saveTrainingAction(training) {
  return dispatch => {
    dispatch({
      type: "SAVE_TRAINING",
      training
    });
  };
}

function updateTrainingAction(id, training) {
  return dispatch => {
    dispatch({
      type: "UPDATE_TRAINING",
      id,
      training
    });
  };
}

function saveSelectedTrainingAction(training) {
  return dispatch => {
    dispatch({
      type: "SAVE_SELECTED_TRAINING",
      training
    });
  };
}

function saveIntervalToEditAction(interval) {
  return dispatch => {
    dispatch({
      type: "SAVE_INTERVAL_TO_EDIT",
      interval
    });
  };
}

function deleteIntervalAction(intervalId) {
  return dispatch => {
    dispatch({
      type: "DELETE_INTERVAL",
      intervalId
    });
  };
}

function saveTrainingInCreationAction(training) {
  return dispatch => {
    dispatch({
      type: "SAVE_TRAINING_IN_CREATION",
      training
    });
  };
}

function deleteTrainingAction(trainingId) {
  return dispatch => {
    dispatch({
      type: "DELETE_TRAINING",
      trainingId
    });
  };
}

export {
  saveTrainingAction,
  updateTrainingAction,
  saveSelectedTrainingAction,
  deleteIntervalAction,
  saveIntervalToEditAction,
  saveTrainingInCreationAction,
  deleteTrainingAction
};
