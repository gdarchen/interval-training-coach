import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Suspense, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DurationPickerModal from "./common/duration-picker-modal/DurationPickerModal";
import IntervalList from "./common/intervals-list/IntervalList";
import { speak } from "./utils/textToSpeechUtils";

const AppShell = React.lazy(() => import("./common/app-shell/AppShell"));
const Credits = React.lazy(() => import("./common/credits/Credits"));

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}));

const App = () => {
  const classes = useStyles();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  return (
    <Router basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <AppShell />

        <div className={classNames(classes.offset, "App")}>
          <Switch>
            <Route path="/credits">
              <Credits />
            </Route>
            <Route path="/">
              <button onClick={speak}>Speech-to-text</button>

              <button onClick={handleOpenModal}>Open modal</button>
              <DurationPickerModal
                isModalOpened={isModalOpened}
                handleCloseModal={handleCloseModal}
              />

              <IntervalList />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
