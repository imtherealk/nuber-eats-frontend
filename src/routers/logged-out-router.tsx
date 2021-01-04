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
import { ConfirmEmail } from "../pages/user/confirm-email";

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
        <Route path="/confirm" exact>
          <ConfirmEmail />
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
