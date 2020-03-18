import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { saveIntervalToEditAction } from "../../redux/actions/trainingActions";
import { formatDuration } from "../../utils/durationUtils";
import { formatIntervalToSpeechText, speak } from "../../utils/textToSpeechUtils";
import IntervalListItem from "./IntervalListItem";
import IntervalOccurences from "./IntervalOccurence";

const useStyles = makeStyles({
  list: {
    marginTop: "20px"
  },
  paddedListItem: {
    "& > *:not(:last-child)": {
      marginBottom: "2px"
    }
  },
  listItem: {
    flexDirection: "column",
    alignItems: "center"
  },
  interval: {
    cursor: "pointer"
  },
  occurencesListItem: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

const IntervalList = ({
  training,
  isEditMode,
  saveIntervalToEditAction: saveIntervalToEdit
}) => {
  const classes = useStyles();

  if (!training) {
    return null;
  }

  return (
    <div>
      {training.periods.map((period, index) => {
        return (
          <List
            key={`${index}-${JSON.stringify(period.group)}-${JSON.stringify(
              period.occurences
            )}`}
            className={classes.list}
          >
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
                      key={`${index}-${JSON.stringify(
                        interval
                      )}-${JSON.stringify(interval.occurences)}`}
                    >
                      <IntervalListItem
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
                className={classNames(
                  classes.listItem,
                  classes.occurencesListItem
                )}
              >
                <IntervalOccurences occurences={period.occurences} />
              </ListItem>
            )}
          </List>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  saveIntervalToEditAction: interval =>
    dispatch(saveIntervalToEditAction(interval))
});

export default connect(null, mapDispatchToProps)(IntervalList);
