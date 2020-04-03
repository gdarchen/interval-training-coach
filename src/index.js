import { orange, yellow } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import throttle from "lodash/throttle";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import { loadState, saveState } from "./core/localStorage";
import "./index.css";
import trainingReducer from "./redux/reducers/trainingReducer";
import * as serviceWorker from "./serviceWorker";

// Load the persisted state from the previous session
const persistedState = loadState();
// Build the initial Redux state
const initialState = {
  ...persistedState,
  ...(!(
    persistedState &&
    persistedState.trainingReducer &&
    persistedState.trainingReducer.trainings.length
  )
    ? {
        trainingReducer: {
          trainings: [
            {
              id: "f541eb16-aaca-49c7-ab88-549252bce27c",
              name: "Entrainement test 1",
              periods: [
                {
                  id: "6f835219-8a96-4ad6-8f80-56084631c553",
                  group: [
                    {
                      id: "bf47545a-15fa-4b7d-9e49-3dbb90349ea9",
                      duration: { hours: 0, minutes: 20, seconds: 0 },
                      description: "Endurance fondamentale"
                    }
                  ],
                  occurences: 1
                },
                {
                  id: "65c62e09-532c-4427-84fa-70d39228653a",
                  group: [
                    {
                      id: "41f2e79e-bb45-43f3-8a4a-c3932fbf5e5a",
                      duration: { hours: 0, minutes: 30, seconds: 0 },
                      description: "Allure semi-marathon"
                    },
                    {
                      id: "8a0175a2-fdcd-4fe7-b8dd-bc7b724305e4",
                      duration: { hours: 0, minutes: 2, seconds: 0 },
                      description: "Endurance fondamentale"
                    }
                  ],
                  occurences: 2
                }
              ]
            }
          ]
        }
      }
    : [])
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
