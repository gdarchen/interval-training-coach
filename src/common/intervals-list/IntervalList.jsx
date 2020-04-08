import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ReorderIcon from "@material-ui/icons/Reorder";
import arrayMove from "array-move";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import {
  saveIntervalToEditAction,
  saveTrainingInCreationAction,
  savePeriodInOccurenceEditionAction,
} from "../../redux/actions/trainingActions";
import { formatDuration } from "../../utils/durationUtils";
import {
  formatIntervalToSpeechText,
  speak,
} from "../../utils/textToSpeechUtils";
import IntervalListItem from "./IntervalListItem";
import IntervalOccurences from "./IntervalOccurence";

const useStyles = makeStyles({
  intervalListContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  period: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    color: "white",
  },
  list: {
    paddingTop: "20px",
  },
  paddedListItem: {
    "& > *:not(:last-child)": {
      marginBottom: "2px",
    },
  },
  listItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  interval: {
    cursor: "pointer",
  },
  occurencesListItem: {
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  editOccurences: {
    marginLeft: 20,
  },
});

const IntervalList = ({
  training,
  isEditMode,
  saveIntervalToEdit,
  saveTrainingInCreation,
  isRepeatEditionMode,
  savePeriodInOccurenceEdition,
}) => {
  const classes = useStyles();

  if (!training) {
    return null;
  }

  const DragHandle = SortableHandle(() => <ReorderIcon />);

  const Period = ({ period, index }) => (
    <div
      key={`${index}-${JSON.stringify(period.group)}-${JSON.stringify(
        period.occurences
      )}`}
      className={classes.period}
    >
      {isEditMode && <DragHandle />}
      <List className={classes.list}>
        <ListItem
          className={classNames(classes.listItem, classes.paddedListItem)}
        >
          {period.group &&
            period.group.map((interval, index) => {
              return (
                <div
                  className={classes.interval}
                  onClick={() =>
                    isEditMode
                      ? saveIntervalToEdit(interval)
                      : speak(formatIntervalToSpeechText(interval))
                  }
                  key={`${index}-${JSON.stringify(interval)}-${JSON.stringify(
                    interval.occurences
                  )}`}
                >
                  <IntervalListItem
                    intervalId={interval.id}
                    formattedDuration={
                      interval.duration
                        ? formatDuration(interval.duration)
                        : null
                    }
                    description={interval.description}
                    isEditMode={isEditMode}
                  />
                </div>
              );
            })}
        </ListItem>
        {period.occurences > 1 && (
          <ListItem
            className={classNames(classes.listItem, classes.occurencesListItem)}
          >
            <IntervalOccurences occurences={period.occurences} />
            {isRepeatEditionMode && (
              <Button
                color="primary"
                className={classes.editOccurences}
                onClick={() => savePeriodInOccurenceEdition(period)}
              >
                Edit occurences
              </Button>
            )}
          </ListItem>
        )}
      </List>
    </div>
  );

  const SortablePeriod = SortableElement(Period);

  const IntervalList = () => (
    <div>
      {training &&
        training.periods &&
        training.periods.map((period, index) => {
          const PeriodToRender = isEditMode ? SortablePeriod : Period;
          return (
            <PeriodToRender
              key={`sortable-item-${index}-${JSON.stringify(
                period.group
              )}-${JSON.stringify(period.occurences)}`}
              period={period}
              index={index}
            />
          );
        })}
    </div>
  );

  const SortableIntervalList = SortableContainer(IntervalList);

  const reorderPeriods = ({ oldIndex, newIndex }) => {
    const reorderedTraining = arrayMove(training.periods, oldIndex, newIndex);
    saveTrainingInCreation({ ...training, periods: reorderedTraining });
    console.log(oldIndex, newIndex);
  };

  return (
    <div className={classes.intervalListContainer}>
      {isEditMode ? (
        <SortableIntervalList onSortEnd={reorderPeriods} useDragHandle />
      ) : (
        <IntervalList />
      )}
    </div>
  );
};

IntervalList.defaultProps = {
  isRepeatEditionMode: false,
};

const mapDispatchToProps = (dispatch) => ({
  saveIntervalToEdit: (interval) =>
    dispatch(saveIntervalToEditAction(interval)),
  saveTrainingInCreation: (training) =>
    dispatch(saveTrainingInCreationAction(training)),
  savePeriodInOccurenceEdition: (period) =>
    dispatch(savePeriodInOccurenceEditionAction(period)),
});

export default connect(null, mapDispatchToProps)(IntervalList);
