import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const AppShell = React.lazy(() => import("./common/app-shell/AppShell"));
const Credits = React.lazy(() => import("./common/credits/Credits"));

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}));

const App = () => {
  const classes = useStyles();

  const speak = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = "Welcome to my first Progressive Web App!";
    msg.volume = 0.1;
    msg.voice = speechSynthesis
      .getVoices()
      .filter(voice => voice.name === "Thomas")[0];
    speechSynthesis.speak(msg);
    console.log(msg);
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
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
