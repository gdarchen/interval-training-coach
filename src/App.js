import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { saveTrainingAction } from "./redux/actions/trainingActions";

const AppShell = React.lazy(() => import("./common/app-shell/AppShell"));
const Credits = React.lazy(() => import("./common/credits/Credits"));
const Home = React.lazy(() => import("./pages/home/Home"));

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}));

const App = ({ saveTrainingAction: saveTraining }) => {
  const classes = useStyles();

  // saveTraining({ teeeest: "tttttt" });
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
              <Home />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
};

const mapDispatchToProps = dispatch => ({
  saveTrainingAction: training => dispatch(saveTrainingAction(training))
});

export default connect(null, mapDispatchToProps)(App);
