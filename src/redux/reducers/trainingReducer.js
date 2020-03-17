const trainingReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_TRAINING":
      console.log(state.trainings);
      return { ...state, trainings: [...state.trainings, action.training] };
    default:
      return state;
  }
};

export default trainingReducer;
