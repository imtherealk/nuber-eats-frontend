import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../api-types/meQuery";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { Restautants } from "../pages/client/restaurants";
import { NotFound } from "../pages/404";

const ClientRoutes = [
  <Route path="/" exact>
    <Restautants />
  </Route>,
];
const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data: data, loading, error } = useQuery<meQuery>(ME_QUERY);

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
