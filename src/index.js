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
import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import { yellow, orange } from "@material-ui/core/colors";

// Load the persisted state from the previous session
const persistedState = loadState();

// Build the initial Redux state
const initialState = {
  ...persistedState
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
      rootReducer: {
        /* toto: store.getState().rootReducer.toto, */
      }
    });
  }, 1000)
);

const theme = createMuiTheme({
  palette: {
    primary: yellow,
    secondary: orange
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
