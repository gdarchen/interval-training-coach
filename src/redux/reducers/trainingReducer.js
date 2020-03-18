const trainingReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_TRAINING":
      return { ...state, trainings: [...state.trainings, action.training] };
    case "SAVE_SELECTED_TRAINING":
      return { ...state, selectedTraining: action.training };
    case "SAVE_INTERVAL_TO_EDIT":
      return { ...state, intervalToEdit: action.interval };
    case "SAVE_TRAINING_IN_CREATION":
      return { ...state, trainingInCreation: action.training };
    default:
      return state;
  }
};

export default trainingReducer;
