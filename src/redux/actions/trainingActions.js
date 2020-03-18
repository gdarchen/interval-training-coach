function saveTrainingAction(training) {
  return dispatch => {
    dispatch({
      type: "SAVE_TRAINING",
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

function saveTrainingInCreationAction(training) {
  return dispatch => {
    dispatch({
      type: "SAVE_TRAINING_IN_CREATION",
      training
    });
  };
}

export {
  saveTrainingAction,
  saveSelectedTrainingAction,
  saveIntervalToEditAction,
  saveTrainingInCreationAction
};
