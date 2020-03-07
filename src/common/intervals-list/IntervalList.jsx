import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { formatDuration } from "../../utils/durationUtils";
import IntervalListItem from "./IntervalListItem";
import IntervalOccurences from "./IntervalOccurence";
import classNames from "classnames";
import {
  speak,
  formatIntervalToSpeechText
} from "../../utils/textToSpeechUtils";

const periods = [
  {
    group: [
      {
        duration: { hours: 0, minutes: 20, seconds: 0 },
        description: "Endurance fondamentale"
      }
    ],
    occurences: 1
  },
  {
    group: [
      {
        duration: { hours: 0, minutes: 30, seconds: 0 },
        description: "Allure semi-marathon"
      },
      {
        duration: { hours: 0, minutes: 2, seconds: 0 },
        description: "Endurance fondamentale"
      }
    ],
    occurences: 2
  }
];

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

const IntervalList = () => {
  const classes = useStyles();

  return (
    <div>
      {periods.map((period, index) => {
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
