import jp from "jsonpath";
import {
  deleteIntervalOrPeriod,
  deleteTrainingById
} from "../../utils/intervalUtils";

const trainingReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_TRAINING":
      return { ...state, trainings: [...state.trainings, action.training] };
    case "UPDATE_TRAINING":
      const newTrainings = state.trainings;
      jp.apply(newTrainings, `$[?(@.id == '${action.id}')]`, value => ({
        id: action.id,
        ...action.training
      }));
      return { ...state, trainings: [...newTrainings] };
    case "SAVE_SELECTED_TRAINING":
      return { ...state, selectedTraining: action.training };
    case "SAVE_INTERVAL_TO_EDIT":
      return { ...state, intervalToEdit: action.interval };
    case "SAVE_TRAINING_IN_CREATION":
      return { ...state, trainingInCreation: action.training };
    case "DELETE_TRAINING":
      const updatedTrainingsAfterTrainingDeletion = deleteTrainingById(
        state.trainings,
        action.trainingId
      );
      console.log(updatedTrainingsAfterTrainingDeletion);
      return {
        ...state,
        trainings: [...updatedTrainingsAfterTrainingDeletion]
      };
    case "DELETE_INTERVAL":
      const updatedTrainingsAfterIntervalDeletion = deleteIntervalOrPeriod(
        action.intervalId,
        state.trainingInCreation
      );
      return {
        ...state,
        trainingInCreation: { ...updatedTrainingsAfterIntervalDeletion }
      };
    default:
      return state;
  }
};

export default trainingReducer;
