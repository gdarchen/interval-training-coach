import React from "react";
import TrainingCreation from "../training-creation/TrainingCreation";
import { useLocation } from "react-router-dom";

const TrainingEdition = () => {
  const location = useLocation();
  const { trainingToEdit } = location && location.state;

  return <TrainingCreation trainingToEdit={trainingToEdit} isEditionMode />;
};

export default TrainingEdition;
