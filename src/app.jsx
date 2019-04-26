// @flow

import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { Route, Switch, HashRouter } from "react-router-dom";

import Main from "./scenes/main/index.jsx";

import reducers from "./services/index";

// middleware
import promiseMiddleware from "./middleware/promiseMiddleware";

const enhancer = applyMiddleware(promiseMiddleware);
const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="*" component={Main} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
