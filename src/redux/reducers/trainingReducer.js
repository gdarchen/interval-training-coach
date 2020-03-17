const trainingReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_TRAINING":
      return { ...state, training: [...state.training, action.training] };
    default:
      return state;
  }
};

export default trainingReducer;
