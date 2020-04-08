import jp from "jsonpath";
import {
  deleteIntervalOrPeriod,
  deleteTrainingById,
  updatePeriodOccurences,
  deletePeriod,
} from "../../utils/intervalUtils";

const trainingReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_TRAINING":
      return { ...state, trainings: [...state.trainings, action.training] };
    case "UPDATE_TRAINING":
      const newTrainings = state.trainings;
      jp.apply(newTrainings, `$[?(@.id == '${action.id}')]`, (value) => ({
        id: action.id,
        ...action.training,
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
      return {
        ...state,
        trainings: [...updatedTrainingsAfterTrainingDeletion],
      };
    case "DELETE_INTERVAL":
      const updatedTrainingsAfterIntervalDeletion = deleteIntervalOrPeriod(
        action.intervalId,
        state.trainingInCreation
      );
      return {
        ...state,
        trainingInCreation: { ...updatedTrainingsAfterIntervalDeletion },
      };
    case "DELETE_PERIOD":
      const updatedTrainingAfterPeriodDeletion = deletePeriod(
        action.periodId,
        state.trainingInCreation
      );
      return {
        ...state,
        trainingInCreation: { ...updatedTrainingAfterPeriodDeletion },
      };
    case "SAVE_PERIOD_IN_OCCURENCE_EDITION":
      return { ...state, periodInOccurenceEdition: action.period };
    case "UPDATE_PERIOD_OCCURENCES":
      const updatedTrainingsAfterPeriodOccurenceEdition = updatePeriodOccurences(
        state.trainingInCreation,
        action.periodId,
        action.occurences
      );
      return {
        ...state,
        trainingInCreation: { ...updatedTrainingsAfterPeriodOccurenceEdition },
      };
    default:
      return state;
  }
};

export default trainingReducer;
