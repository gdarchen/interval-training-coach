import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
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

const IntervalList = ({ training }) => {
  const classes = useStyles();
  console.log(training);

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
                        speak(formatIntervalToSpeechText(interval))
                      }
                      key={`${index}-${JSON.stringify(
                        interval
                      )}-${JSON.stringify(interval.occurences)}`}
                    >
                      <IntervalListItem
                        formattedDuration={formatDuration(interval.duration)}
                        description={interval.description}
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

export default IntervalList;
