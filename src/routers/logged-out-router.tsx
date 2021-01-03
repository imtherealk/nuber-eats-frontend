import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect exact from="/" to="/login" />
        {/* <Route path="/" exact>
          <Restaurants />
        </Route> */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
