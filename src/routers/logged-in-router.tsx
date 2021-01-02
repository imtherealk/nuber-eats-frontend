import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={() => isLoggedInVar(false)}>click to logout</button>
    </div>
  );
};
