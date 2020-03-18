import throttle from "lodash/throttle";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import { loadState, saveState } from "./core/localStorage";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import trainingReducer from "./redux/reducers/trainingReducer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { yellow, orange } from "@material-ui/core/colors";
import {v4 as uuidv4} from "uuid";

// Load the persisted state from the previous session
const persistedState = loadState();

// Build the initial Redux state
const initialState = {
  ...persistedState,
  trainingReducer: {
    trainings: [
      {
        id: uuidv4(),
        name: "Entrainement test 1",
        periods: [
          {
            id: uuidv4(),
            group: [
              {
                id: uuidv4(),
                duration: { hours: 0, minutes: 20, seconds: 0 },
                description: "Endurance fondamentale"
              }
            ],
            occurences: 1
          },
          {
            group: [
              {
                id: uuidv4(),
                duration: { hours: 0, minutes: 30, seconds: 0 },
                description: "Allure semi-marathon"
              },
              {
                id: uuidv4(),
                duration: { hours: 0, minutes: 2, seconds: 0 },
                description: "Endurance fondamentale"
              }
            ],
            occurences: 2
          }
        ]
      },
    ]
  }
};

// Load the Redux reducers and combine them
const reducer = combineReducers({ trainingReducer });

// Create the Redux store relying on the previously built reducers and initialState
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

// Each second, we save the current state of the application so as to be able to restore it in a next session
store.subscribe(
  throttle(() => {
    saveState({
      trainingReducer: {
        trainings: store.getState().trainingReducer.trainings
      }
    });
  }, 1000)
);

const theme = createMuiTheme({
  palette: {
    primary: yellow,
    secondary: orange,
    ternary: "#FFFFFF"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
