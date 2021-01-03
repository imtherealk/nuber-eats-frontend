import { gql, useQuery } from "@apollo/client";
import React from "react";
import { meQuery } from "../api-types/meQuery";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

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
    <div>
      <h1>{data.me.email}</h1>
      <button onClick={logout}>click to logout</button>
    </div>
  );
};
