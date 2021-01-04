import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | Nuber Eats</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">Page Not Found</h2>
    <h4 className="font-semibold text-base mb-5">
      Sorry, we can't find the page you were looking for.
    </h4>
    <div>
      Return to the{" "}
      <Link to="/" className="text-lime-600 hover:underline">
        homepage
      </Link>
    </div>
  </div>
);
