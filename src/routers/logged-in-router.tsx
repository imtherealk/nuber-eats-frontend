import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { Restaurants } from "../pages/client/restaurants";
import { NotFound } from "../pages/404";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
  };

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-lg tracking-wide">Loading..</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Redirect exact from="/login" to="/" />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
