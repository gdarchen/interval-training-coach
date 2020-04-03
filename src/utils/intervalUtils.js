import jp from "jsonpath";

export const deleteIntervalOrPeriod = (intervalId, trainings) => {
  const newTrainings = trainings;

  // Group containing the interval to remove
  const group = jp.parent(newTrainings, `$..group[?(@.id == '${intervalId}')]`);

  // Get the node to the interval
  const nodes = jp.nodes(
    newTrainings,
    `$..group[?(@.id == '${intervalId}')]`
  )[0].path;
  // Pop the node path twice to mount up to the period containing the interval
  nodes.pop(); // interval index
  nodes.pop(); // group field
  // Get the period containing the interval
  const period = jp.value(trainings, nodes);

  // If this interval is the only one in the group, we remove the whole group
  if (group && group.length === 1) {
    // Pop the node once more to mount up to the periods array
    nodes.pop();
    // Get the periods array
    const periods = jp.value(trainings, nodes);
    // Remove the whole period
    const newPeriods = periods.filter(p => p.id !== period.id);

    // Replace the periods array with the new one (removing the one containing the interval)
    newTrainings.periods = [...newPeriods];
  } else {
    // Delete only the interval
    // Remove the interval from the group
    const newGroup = group.filter(interval => interval.id !== intervalId);

    // Replace the period to replace its group (and therefore remove the interval)
    jp.apply(newTrainings, `$..periods[?(@.id == '${period.id}')]`, value => ({
      ...value,
      group: [...newGroup]
    }));
  }

  return newTrainings;
};

export const deleteTrainingById = (trainings, trainingToDeleteId) => {
  return trainings.filter(training => training.id !== trainingToDeleteId);
};
