function saveTrainingAction(training) {
  return dispatch => {
    dispatch({
      type: "SAVE_TRAINING",
      training
    });
  };
}

export { saveTrainingAction };
