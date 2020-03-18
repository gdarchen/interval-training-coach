import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { saveIntervalToEditAction } from "./redux/actions/trainingActions";

const AppShell = React.lazy(() => import("./common/app-shell/AppShell"));
const Credits = React.lazy(() => import("./common/credits/Credits"));
const Home = React.lazy(() => import("./pages/home/Home"));
const TrainingCreation = React.lazy(() =>
  import("./pages/training-creation/TrainingCreation")
);
const TrainingEdition = React.lazy(() =>
  import("./pages/training-edition/TrainingEdition")
);
const IntervalEditionModal = React.lazy(() =>
  import("./common/interval-edition-modal/IntervalEditionModal")
);

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}));

const App = ({ saveIntervalToEdit, intervalToEdit }) => {
  const classes = useStyles();

  const handleCloseModal = () => {
    saveIntervalToEdit(null);
  };

  // saveTraining({ teeeest: "tttttt" });
  return (
    <Router basename="/interval-training-coach">
      <Suspense fallback={<div>Loading...</div>}>
        <AppShell />

        <div className={classNames(classes.offset, "App")}>
          <IntervalEditionModal
            isModalOpened={!!intervalToEdit}
            handleCloseModal={handleCloseModal}
          />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/credits">
              <Credits />
            </Route>
            <Route path="/training-creation">
              <TrainingCreation />
            </Route>
            <Route path="/training-edition">
              <TrainingEdition />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
};

const mapStateToProps = state => ({
  intervalToEdit: state.trainingReducer.intervalToEdit
});

const mapDispatchToProps = dispatch => ({
  saveIntervalToEdit: interval => dispatch(saveIntervalToEditAction(interval))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
