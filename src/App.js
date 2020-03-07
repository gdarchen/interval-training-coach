import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AppShell from "./common/app-shell/AppShell";
import Credits from "./common/credits/Credits";
import classNames from "classnames";

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
    <Router>
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
    </Router>
  );
};

export default App;
